import { PermissionFlagsBits } from 'discord-api-types/v10';
import { addServerToNoCommandsList, create_moderator_command } from '../../../command';

export const command = create_moderator_command(
    async ({ message, db }) => {
        if (!message.guild) {
            return;
        }
        await addServerToNoCommandsList(db, message.guild.id);
        return 'Commands have been disabled!';
    },
    'Disable all non custom and non moderate commands for this server',
    undefined,
    undefined,
    {
        config: (x) => x.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers).toJSON(),
        func: async ({ db, interaction }) => {
            if (!interaction.guild) {
                return;
            }
            await addServerToNoCommandsList(db, interaction.guild.id);
            return {
                ephemeral: true,
                content: 'Commands have been disabled',
            };
        },
    },
);
