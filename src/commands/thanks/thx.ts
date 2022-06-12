import { create_command } from '../../command';
import { getCooldownTimeForThanking, checkIfUserThanked, insertHavingThanked, insertThanks } from './queries.queries';
import { match } from 'typescript-pattern-matching';
import { PoolWrapper } from '../../db';
import { Client, User } from 'discord.js';

type CommandReturn =
    | {
          success: false;
          error: string;
      }
    | {
          success: true;
          message: string;
      };

const commandFunc = async (
    db: PoolWrapper,
    users_to_thank: Array<User>,
    guild: string,
    client: Client,
    thanker: User,
): Promise<CommandReturn> => {
    const ids = users_to_thank.map((v) => v.id);
    if (ids.length == 0) {
        return {
            success: false,
            error: 'Missing people to thank. When using text commands, mention them.',
        };
    }
    const res = await writeToDB({ db, server_id: guild, client, thanker: thanker, to_thank: users_to_thank });
    return match({ thanked_count: ids.length, ...res })
        .with({ thanked_count: 1, thankedSelf: true }, () => ({
            success: false,
            error: 'To keep it fair, you can not thank yourself.',
        }))
        .with({ thanked_count: 1, containsToRecent: true }, () => ({
            success: false,
            error: 'Sorry, you already thanked this user not so long ago. Wait a minute before thanking him/her again',
        }))
        .with({ thanked_count: 1, thankedMe: true }, () => ({
            success: true,
            message: 'Thank you! I just do my best! :)',
        }))
        .with({ thanked_count: 1 }, () => ({
            success: true,
            message: 'Thank you for letting me know that this person helped you out.',
        }))
        .with({ thanked_count: 2, thankedSelf: true, containsToRecent: true }, () => ({
            success: false,
            error: "Sorry, but you can't thank yourself and you already recently thanked the other person",
        }))
        .otherwise(() => {
            let base = 'Thanks for informing me that these users helped you out!';
            if (res.containsToRecent) {
                base +=
                    ' Your message contains users you already thanked. Wait a minute before thanking them again :).';
            }
            if (res.thankedSelf) {
                base += " You can't thank yourself.";
            }
            return {
                success: true,
                message: base,
            };
        })
        .run();
};

export const command = create_command(
    async (params) => {
        if (!params.message.guild) {
            return;
        }
        const peopleBeingThanked = params.message.mentions.users.map((x) => x);
        const res = await commandFunc(
            params.db,
            peopleBeingThanked,
            params.message.guild.id,
            params.client,
            params.message.author,
        );
        return res.success ? res.message : res.error;
    },
    'Lets me know that someone helped you out or was awesome in another way.',
    ['thanks', 'thank', 'ty'],
    async ({ message }) => !!message.guild,
    undefined,
    {
        config: (x) =>
            x
                .addUserOption((x) => x.setDescription('User you want to thank').setName('member').setRequired(true))
                .toJSON(),
        func: async (params) => {
            if (!params.interaction.guild) {
                return 'This slash command only works for guilds.';
            }
            const res = await commandFunc(
                params.db,
                [params.interaction.options.getUser('member', true)],
                params.interaction.guild.id,
                params.client,
                params.interaction.user,
            );
            if (res.success) {
                return { content: res.message, ephemeral: false };
            } else {
                return { content: res.error, ephemeral: true };
            }
        },
    },
);

const getUnixTimestamp = () => Math.floor(Date.now() / 1000);
const writeToDB = ({
    db,
    server_id,
    to_thank,
    thanker,
    client,
}: {
    db: PoolWrapper;
    server_id: string;
    to_thank: Array<User>;
    thanker: User;
    client: Client;
}) => {
    const peopleBeingThanked = to_thank;
    return db.startTransaction(async (db) => {
        const time = await getCooldownTimeForThanking
            .run({ server_id }, db)
            .then((x) => x[0]?.time_between_thanking ?? 1);

        const currentTime = BigInt(getUnixTimestamp());
        const time_since = (currentTime - BigInt(time)).toString();

        const thanker_id = thanker.id;

        let containsToRecent = false;
        let thankedSelf = false;
        let thankedMe = false;

        await Promise.all(
            peopleBeingThanked.map(async (x) => ({
                got_thanked: await checkIfUserThanked
                    .run({ getting_thanked_id: x.id, server_id, thanker_id, time_since }, db)
                    .then((x) => (x[0]?.count ?? 0) > 0),
                user: x,
            })),
        ).then((x) => {
            return Promise.all(
                x
                    .filter((x) => {
                        if (x.got_thanked) {
                            containsToRecent = true;
                            return false;
                        }
                        if (x.user.id == thanker_id) {
                            thankedSelf = true;
                            return false;
                        }
                        if (x.user.id == client.user?.id) {
                            thankedMe = true;
                        }
                        return true;
                    })
                    .map((x) => x.user)
                    .map((x) => {
                        return insertThanks.run({ getting_thanked_id: x.id, server_id }, db).then(() => x);
                    }),
            ).then((x) => {
                x.map((x) => {
                    return insertHavingThanked.run(
                        {
                            at_time: currentTime.toString(),
                            server_id,
                            thanker_id,
                            being_thanked_id: x.id,
                        },
                        db,
                    );
                });
            });
        });
        return { containsToRecent, thankedSelf, thankedMe };
    });
};
