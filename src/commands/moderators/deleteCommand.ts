import { create_moderator_command } from '../../command';
import { deleteCommand } from './queries.queries';

export const command = create_moderator_command(async ({ message, args, db }) => {
    const name = args[0];
    if (!name) {
        return 'Must provide the name for the command to delete';
    }
    await deleteCommand.run({ name: name, server_id: message.guild?.id }, db);
    return `Successfully deleted ${name}`;
}, `Deletes a custom command. Format is \`!delete {name}\``);
