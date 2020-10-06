import { create_command } from '../../command';

export const command = create_command(
    async ({ message }) => {
        const msg = await message.channel.send('Pinging...');
        const latency = msg.createdTimestamp - message.createdTimestamp;

        msg.edit(`The latency current is around \`${latency}ms\``);
    },
    'Gives the latency of the bot.',
    ['lat', 'latency'],
);
