import { PermissionFlagsBits } from 'discord-api-types/v10';
import { create_moderator_command } from '../../../command';
import { peopleWhoSendPossibleScam } from '../../../protection/scam';

const commandFunc = (guild_id: string, user_ids: Array<string>) => {
    const guildObj = peopleWhoSendPossibleScam[guild_id] || {};
    user_ids.forEach((x) => delete guildObj[x]);
    return 'removed the strike';
};

export const command = create_moderator_command(
    async ({ message }) => {
        const guild = message.guild;
        if (!guild) {
            return;
        }
        return commandFunc(
            guild.id,
            message.mentions.users.map((x) => x.id),
        );
    },
    'Removes the strike of a scam message.',
    undefined,
    undefined,
    {
        config: (x) =>
            x
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
                .addUserOption((x) =>
                    x.setName('user').setDescription('User to remove the strike from').setRequired(true),
                )
                .toJSON(),
        func: async ({ interaction }) => {
            if (!interaction.guild) {
                return;
            }
            const userId = interaction.options.getUser('user', true).id;
            return {
                ephemeral: true,
                content: commandFunc(interaction.guild.id, [userId]),
            };
        },
    },
);
