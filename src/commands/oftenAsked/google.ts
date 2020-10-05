import { create_command } from '../../command';

export const command = create_command(
    async ({ message, args }) => {
        let search = args.join('+')

        await message.channel.send(`Google might have the answer to that for you! https://www.google.com/search?q=${search}`);
    },
    'Gives Google search results for the question.',
    ['ask', 'search'],
);
