import { create_command } from '../../command';

export const command = create_command(
    async ({ message, args }) => {
        const search = args.join('+');

        await message.channel.send(
            `DuckDuckGo might have the answer to that for you! https://duckduckgo.com/?q=${search}`,
        );
    },
    'Gives DuckDuckGo search results for the question.',
    ['duckduckgo'],
);
