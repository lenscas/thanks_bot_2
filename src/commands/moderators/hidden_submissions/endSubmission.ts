import { create_moderator_command } from '../../../command';
import { endSubmission } from '../queries.queries';

export const command = create_moderator_command(async ({ message, db }) => {
    const channelToCopyFrom = await endSubmission
        .run({ from_channel: message.channel.id, server_id: message.guild?.id }, db)
        .then((x) => x[0]?.stored_channel);
    if (!channelToCopyFrom) {
        return "It doesn't look like a submission is going on in this channel.";
    }
    return `I ended the submission time. Now, all you have to do is show <#${channelToCopyFrom}>. I would do it myself, but my creator is too lazy to let me do that :(`;
}, 'This ends the secret submission time and posts every submission in the channel.');
