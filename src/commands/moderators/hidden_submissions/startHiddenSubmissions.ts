import { create_moderator_command } from '../../../command';
import { checkIfChannelsAreAlreadyUsed, enableSubmissionChannel } from '../queries.queries';

export const command = create_moderator_command(async ({ message, db }) => {
    const asArr = message.mentions.channels.array();
    if (asArr.length == 0) {
        return 'You need to specify 1 channel that submissions are going to be stored in';
    }
    if (asArr.length > 1) {
        return 'You can only specify 1 channel that submissions are going to be stored in';
    }

    return db.startTransaction(async (db) => {
        const params = {
            server_id: message.guild?.id,
            from_channel: message.channel.id,
            to_channel: asArr[0].id,
        };
        const res = await checkIfChannelsAreAlreadyUsed
            .run(params, db)
            .then((x) => x[0])
            .then((x) => ({
                from_channel_free: x.from_channel_count == '0',
                stored_channel_free: x.stored_channel_count == '0',
            }));
        if (!res.from_channel_free) {
            return 'This channel is already being used for hidden submissions';
        }
        if (!res.stored_channel_free) {
            return 'The given channel is already being used to store hidden submissions';
        }
        await enableSubmissionChannel.run(params, db);
        return 'The hidden submission is setup. Use !endSubmission in this channel to end it';
    });
}, 'Enables a channel to receive hidden submissions. This means that every message will be automatically deleted and transported to the given channel.');
