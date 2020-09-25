import { create_command } from '../../command';

export const command = create_command(async ({ message }) => {
    await message.channel.send('awesome!');
}, 'This is a basic test command');
