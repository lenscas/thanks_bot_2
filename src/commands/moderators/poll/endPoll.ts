import { create_moderator_command } from '../../../command';
import { deletePoll, getMessagesFromPoll, getPoll, getPollsInChannel, getReactEmoji } from './queries.queries';

export const command = create_moderator_command(
    async ({ args, db, message }) => {
        const server_id = message.guild?.id;
        const params = { channel_id: message.channel.id, server_id };
        const name = args[0];
        let messages: string[];
        let reactEmoji: string;
        let pollId: string;
        if (name) {
            let res = await getPoll.run({ ...params, name }, db);
            if (res.length == 0) {
                return "Looks like there isn't a poll active in this channel with this name.";
            }
            let poll = res[0];
            reactEmoji = poll.react_emoji;
            messages = res.map((x) => x.message_id);
            pollId = poll.poll_id;
        } else {
            const polls = await getPollsInChannel.run(params, db);
            if (polls.length == 0) {
                return 'No active polls found in this channel';
            }
            if (polls.length == 1) {
                console.log(polls, params);
                let poll = polls[0];
                reactEmoji = poll.react_emoji;
                messages = await getMessagesFromPoll
                    .run({ poll_id: poll.id }, db)
                    .then((x) => x.map((x) => x.message_id));
                pollId = poll.id;
            } else {
                return (
                    'There are multiple polls active in this channel. Polls:\n' + polls.map((x) => x.name).join('\n')
                );
            }
        }
        const a = await Promise.all(
            messages.map((x) =>
                message.channel.messages.fetch(x).then((x) => ({
                    message: x,
                    reactions: x.reactions.resolve(reactEmoji)?.count ?? 0,
                })),
            ),
        );
        const first = a[0];
        const biggest = a.splice(1).reduce((x, y) => {
            if (y.reactions > x.reactions) {
                return y;
            } else {
                return x;
            }
        }, first);
        await deletePoll.run({ poll_id: pollId }, db);
        return 'The most voted option was:\n' + biggest.message.content + '\n\n' + biggest.message.url;
    },
    `ends a poll in this channel and tallies the result.
If no name was given and there is only one active poll then this one gets ended.
If a name was given than that specific one gets ended.
`,
);
