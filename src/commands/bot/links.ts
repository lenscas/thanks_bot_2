import { create_command_for_command_channel } from '../../command';

const message = `
My code is at <https://github.com/lenscas/thanks_bot_2>'
Bugs reports and feature requests can be asked at: <https://github.com/lenscas/thanks_bot_2/issues>'
There is a test server you can join using: https://discord.gg/g2NaNcS'
Thanks for showing interest in my code and have a nice day :)'
`;

export const command = create_command_for_command_channel(
    async () => message,
    'Puts some links in the chat related to the code of thanks_bot',
    [],
    undefined,
    {
        config: (x) => x.toJSON(),
        func: async () => {
            return { ephemeral: true, content: message };
        },
    },
);
