import { create_moderator_command, removeServerFromNoCommandsList } from '../../../command';

export const command = create_moderator_command(async ({ message, db }) => {
    if (!message.guild) {
        return;
    }
    removeServerFromNoCommandsList(db, message.guild.id);
    return 'Commands have been reenabled!';
}, 'reenable all non custom and non moderate commands for this server');
