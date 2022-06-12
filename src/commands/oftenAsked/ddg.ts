import { create_command } from '../../command';

const commandFunc = (searchFor: string) =>
    `DuckDuckGo might have the answer to that for you! https://duckduckgo.com/?q=${searchFor}`;

export const command = create_command(
    async ({ args }) => {
        const search = args.join('+');

        return commandFunc(search);
    },
    'Gives DuckDuckGo search results for the question.',
    ['duckduckgo'],
    undefined,
    undefined,
    {
        config: (x) =>
            x
                .addStringOption((x) =>
                    x
                        .setName('keyword')
                        .setDescription('what to search for. Use `+` between words instead of spaces')
                        .setRequired(true),
                )
                .toJSON(),
        func: async ({ interaction }) => {
            const search = interaction.options.getString('keyword', true);
            return {
                ephemeral: false,
                content: commandFunc(search),
            };
        },
    },
);
