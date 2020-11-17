import { create_command_for_command_channel } from '../../command';

export const command = create_command_for_command_channel(async ({ message }) => {
    await message.channel.send([
        'My code is at <https://github.com/lenscas/thanks_bot_2>',
        'Bugs reports and feature requests can be asked at: <https://github.com/lenscas/thanks_bot_2/issues>',
        'There is a test server you can join using: https://discord.gg/g2NaNcS',
        'Thanks for showing interest in my code and have a nice day :)',
    ]);
}, 'Puts some links in the chat related to the code of thanks_bot');
