import { create_command } from '../../command';

const commandFunc = (searchFor: string) =>
    `Google might have the answer to that for you! https://www.google.com/search?q=${searchFor}`;

export const command = create_command(
    async ({ args }) => {
        const search = args.join('+');

        return commandFunc(search);
    },
    'Gives Google search results for the question.',
    ['ask', 'search'],
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
