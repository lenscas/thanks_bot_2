import { create_moderator_command } from '../../../command';
import { checkIfCommandExists, editCommand } from '../queries.queries';
import { checkIfChannelIsText, getChannelIdFromMention, removeFirstLine } from '../_base';

export const command = create_moderator_command(
    async ({ message, args, db, client }) => {
        const name = args[0];
        if (!name) {
            return 'Format is `!edit {name} [channel]\\n{message}`';
        }
        if (Number((await checkIfCommandExists.run({ name, server_id: message.guild?.id }, db))[0].count) == 0) {
            return `Command ${name} does not exist. Use !add if you want to add a command`;
        }

        const channel = args[1];
        const messageWithoutStart = removeFirstLine(message.content);
        if (!messageWithoutStart) {
            return 'No message to send detected. Remember, it should be a new line';
        }
        let channelId;
        if (channel) {
            const res = getChannelIdFromMention(channel);
            if ('error' in res) {
                return res.error;
            }
            channelId = res.id;
            const isTextChannel = await checkIfChannelIsText(client, channelId);
            if (isTextChannel !== true) {
                return isTextChannel;
            }
        }

        await editCommand.run(
            { channel_id: channelId, message: messageWithoutStart, name, server_id: message.guild?.id },
            db,
        );
        return `Command ${name} edited. Limited to channel: ${channel}`;
    },
    `Edits a custom command. 
Format is \`!edit {name} [channel]\\n{message}\`. 
Channel is optional and if giving limits the command to only be usable in that channel.
NOTE: message and channel will be edited regardless on what it is. If you want to keep one of them the same pass then pass it the old value`,
);
