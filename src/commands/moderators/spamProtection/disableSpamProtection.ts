import { create_moderator_command } from '../../../command';
import { disableSpamProtection } from '../../../spamProtection';

export const command = create_moderator_command(
    async ({ message }) => {
        if (message.guild) {
            return disableSpamProtection(message.guild.id);
        }
    },
    'Disable the spam protection for this server',
    [],
);
