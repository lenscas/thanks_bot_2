import { create_command_for_command_channel } from '../../command';

export const command = create_command_for_command_channel(
    async ({ message }) => {
        const msg = await message.channel.send('Pinging...');
        const latency = msg.createdTimestamp - message.createdTimestamp;

        msg.edit(`The latency current is around \`${latency}ms\``);
    },
    'Gives the latency of the bot.',
    ['lat', 'latency'],
);
