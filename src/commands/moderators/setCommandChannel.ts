import { create_moderator_command } from '../../command';
import { setCommandChannel } from './queries.queries';

export const command = create_moderator_command(
    async ({ message, db, args }) => {
        const channelsAsArr = message.mentions.channels.map((x) => x.id);
        if (channelsAsArr.length > 1) {
            return 'Only 1 channel can be set as command channel.';
        }
        const usedNone = args[0] == 'NONE';
        if (channelsAsArr.length == 0 && !usedNone) {
            return "If you don't want to set a channel. give `NONE` as the argument.";
        }
        const channel_id: string | null = channelsAsArr[0] ?? null;
        await setCommandChannel.run({ channel_id, server_id: message.guild?.id }, db);
        return 'Done.';
    },
    'Sets up a channel to limit some commands to.',
    ['setcommandchannel', 'setchannel', 'set_channel', 'set_command_channel'],
);
