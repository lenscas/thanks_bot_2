import { create_command, CommandParams } from '../../command';
import { getCooldownTimeForThanking, checkIfUserThanked, insertHavingThanked, insertThanks } from './queries.queries';
import { match } from 'typescript-pattern-matching';

export const command = create_command(
    async (params) => {
        if (!params.message.guild) {
            return;
        }
        const peopleBeingThanked = params.message.mentions.users;
        const ids = peopleBeingThanked.map((_, id) => id);
        if (ids.length == 0) {
            await params.message.channel.send(
                'Please ping the user in your thank message so I know who you are thanking.',
            );
            return;
        }
        const res = await writeToDB(params);
        const returnMessage = match({ thanked_count: ids.length, ...res })
            .with({ thanked_count: 1, thankedSelf: true }, () => 'To keep it fair, you can not thank yourself.')
            .with(
                { thanked_count: 1, containsToRecent: true },
                () =>
                    'Sorry, you already thanked this user not so long ago. Wait a minute before thanking him/her again',
            )
            .with({ thanked_count: 1, thankedMe: true }, () => 'Thank you! I just do my best! :)')
            .with({ thanked_count: 1 }, () => 'Thank you for letting me know that this person helped you out.')
            .with(
                { thanked_count: 2, thankedSelf: true, containsToRecent: true },
                () => "Sorry, but you can't thank yourself and you already recently thanked the other person",
            )
            .otherwise(() => {
                let base = 'Thanks for informing me that these users helped you out!';
                if (res.containsToRecent) {
                    base +=
                        ' Your message contains users you already thanked. Wait a minute before thanking them again :).';
                }
                if (res.thankedSelf) {
                    base += " You can't thank yourself.";
                }
                return base;
            })
            .run();
        await params.message.channel.send(returnMessage);
    },
    'Lets me know that someone helped you out or was awesome in another way.',
    ['thanks', 'thank', 'ty'],
    async ({ message }) => !!message.guild,
);

const getUnixTimestamp = () => Math.floor(Date.now() / 1000);
const writeToDB = (params: CommandParams) => {
    const peopleBeingThanked = params.message.mentions.users;
    return params.db.startTransaction(async (db) => {
        const time = await getCooldownTimeForThanking
            .run({ server_id: params.message.guild?.id }, db)
            .then((x) => x[0]?.time_between_thanking ?? 1);

        const currentTime = BigInt(getUnixTimestamp());
        const time_since = (currentTime - BigInt(time)).toString();

        const server_id = params.message.guild?.id;
        const thanker_id = params.message.author.id;

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
                        if (x.user.id == params.client.user?.id) {
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
