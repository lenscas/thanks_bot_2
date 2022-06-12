import { PermissionFlagsBits } from 'discord-api-types/v10';
import { create_moderator_command } from '../../../command';
import { enableSpamProtection } from '../../../protection/spam';

export const command = create_moderator_command(
    async ({ message, db }) => {
        if (message.guild) {
            return await enableSpamProtection(message.guild.id, db);
        }
    },
    'Enable the spam protection for this server',
    [],
    undefined,
    {
        config: (x) => x.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers).toJSON(),
        func: async ({ interaction, db }) => {
            if (!interaction.guild) {
                return;
            }
            return { ephemeral: true, content: await enableSpamProtection(interaction.guild.id, db) };
        },
    },
);
