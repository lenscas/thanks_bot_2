import { create_moderator_command } from '../../../command';
import { addMessageToPoll, createPoll } from './queries.queries';

export const command = create_moderator_command(
    async ({ args, message, db }) => {
        const guild = message.guild;
        if (!guild) {
            return;
        }
        const server_id = guild.id;

        const channel_id = message.channel.id;
        const react_emoji = args[0];
        const name = args[1];
        if (!name) {
            return 'Could not find a poll name. This is used to end a poll.';
        }
        const pollOptions = message.content.split('\n').splice(1);
        if (pollOptions.length == 0) {
            return 'Could not find any options. Remember, they should start at a new line and be separated by a new line';
        }
        if (!react_emoji) {
            return 'Could not find an emoji used for tracking count';
        }
        try {
            await db.startTransaction(async (transaction) => {
                let poll_id: string;
                try {
                    poll_id = await createPoll
                        .run({ name, channel_id, server_id, react_emoji }, transaction)
                        .then((x) => x[0].id);
                } catch (e) {
                    if ('code' in e && e.code == '23505') {
                        await message.channel.send('There is already a poll in this channel with that name.');
                    } else {
                        await message.channel.send(
                            'Could not create poll. Perhaps a poll is already active in this channel?',
                        );
                        console.error(e);
                    }

                    throw e;
                }
                const sendMessages = [];
                try {
                    await message.channel.send('A new poll has been created. Vote using:' + react_emoji);
                    for (const option of pollOptions) {
                        const res = await message.channel.send(option);
                        sendMessages.push(res);
                        await addMessageToPoll.run({ message_id: res.id, poll_id }, transaction);
                    }
                } catch (e) {
                    console.error(e);
                    message.channel.send('Something has gone wrong while creating the poll. Rolling back');
                    try {
                        for (const messageToRollBack of sendMessages) {
                            await messageToRollBack.delete({ reason: 'Rolling poll back.' });
                        }
                    } catch (e) {
                        console.error(e);
                        message.channel.send('Something has gone wrong while rolling the poll back.');
                        throw e;
                    }
                }
                for (const messageToReactTo of sendMessages) {
                    messageToReactTo.react(react_emoji);
                }
            });
        } catch (_) {}
    },
    'Creates a new poll.\nFormat is `!makePoll {emoji to track} {name to refer to it} [any single line of text you want]\\n{option1}\\n{option2}, etc.',
    [],
);
