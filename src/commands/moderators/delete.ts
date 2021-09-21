import { create_moderator_command } from '../../command';

export const command = create_moderator_command(
    async ({ message, args }) => {
        const amount = args.map((x) => Number(x)).find((x) => !isNaN(x));
        console.log(amount);
        if (!amount) {
            await message.channel.send('Could not get how many messages need to be deleted');
            return;
        }
        if (!('bulkDelete' in message.channel)) {
            await message.channel.send('Can not do a bulk delete for this channel');
            return;
        }

        //we do + 1 to also cover the message that triggered the command
        const [writtenMessage, messages] = await Promise.all([
            message.channel.send('Working on it!'),
            message.channel.messages.fetch({ before: message.id, limit: amount + 1 }),
        ]);

        const idsToDelete = messages
            .filter((x) => x.createdAt > new Date(Date.now() - 1000 * 60 * 60 * 24 * 14))
            .map((x) => x.id)
            .concat(writtenMessage.id);

        await message.channel.bulkDelete(idsToDelete);
        return;
    },
    'Removes X amount of messages that are less than 2 weeks old.',
    ['del', 'remove', 'be_gone'],
);
