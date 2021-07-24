import { create_moderator_command } from '../../../command';
import { disableSpamProtection } from '../../../protection/spam';

export const command = create_moderator_command(
    async ({ message }) => {
        if (message.guild) {
            return disableSpamProtection(message.guild.id);
        }
    },
    'Disable the spam protection for this server',
    [],
);
