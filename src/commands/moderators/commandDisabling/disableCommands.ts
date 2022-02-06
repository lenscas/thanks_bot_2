import { addServerToNoCommandsList, create_moderator_command } from '../../../command';

export const command = create_moderator_command(async ({ message, db }) => {
    if (!message.guild) {
        return;
    }
    addServerToNoCommandsList(db, message.guild.id);
    return 'Commands have been disabled!';
}, 'Disable all non custom and non moderate commands for this server');
