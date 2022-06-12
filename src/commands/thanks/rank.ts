import { Guild, User } from 'discord.js';
import { create_command_for_command_channel } from '../../command';
import { PoolWrapper } from '../../db';
import { getRankOfUser } from './queries.queries';

const commandFunc = async (user: User, guild: Guild, db: PoolWrapper) => {
    const res = await getRankOfUser.run({ user_id: user.id, server_id: guild.id }, db).then((x) => x[0]);
    if (res) {
        return `This user has been thanked **${res.times} times**. And is at rank ${res.rank} .`;
    } else {
        return 'Sorry, no thanks are found for this user :(.';
    }
};

export const command = create_command_for_command_channel(
    async ({ message, db }) => {
        if (!message.guild) {
            return;
        }
        const user = message.mentions.users.first() ?? message.author;
        return await commandFunc(user, message.guild, db);
    },
    'Shows how many times someone got thanked and their current rank',
    [],
    undefined,
    {
        config: (x) =>
            x
                .addUserOption((x) =>
                    x.setName('user').setDescription('User to check (Leave empty for yourself)').setRequired(false),
                )
                .toJSON(),
        func: async ({ db, interaction }) => {
            if (!interaction.guild) {
                return;
            }
            const user = interaction.options.getUser('user') ?? interaction.user;
            const res = await commandFunc(user, interaction.guild, db);
            return { ephemeral: true, content: res };
        },
    },
);
