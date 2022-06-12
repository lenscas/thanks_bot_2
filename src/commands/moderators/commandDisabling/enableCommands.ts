import { PermissionFlagsBits } from 'discord-api-types/v10';
import { create_moderator_command, removeServerFromNoCommandsList } from '../../../command';

export const command = create_moderator_command(
    async ({ message, db }) => {
        if (!message.guild) {
            return;
        }
        await removeServerFromNoCommandsList(db, message.guild.id);
        return 'Commands have been reenabled!';
    },
    'reenable all non custom and non moderate commands for this server',
    undefined,
    undefined,
    {
        config: (x) => x.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers).toJSON(),
        func: async ({ interaction, db }) => {
            if (!interaction.guild) {
                return;
            }
            await removeServerFromNoCommandsList(db, interaction.guild.id);
            return { ephemeral: true, content: 'Commands have been reenabled!' };
        },
    },
);
