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
);
