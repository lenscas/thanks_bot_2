import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';
import { create_command_for_command_channel } from '../../command';

const func = async ({
    is_slash,
    trigger,
}: { is_slash: true; trigger: CommandInteraction } | { is_slash: false; trigger: Message }) => {
    if (is_slash) {
        const now = Date.now();
        await trigger.reply({ ephemeral: true, content: 'Pinging...' });
        const reply = await trigger.fetchReply();
        const timeAt = 'timestamp' in reply ? Number(reply.timestamp) : reply.createdTimestamp;
        trigger.editReply({ content: `The latency is currently around \`${timeAt - now}ms\`` });
    } else {
        const now = Date.now();
        const msg = await trigger.channel.send('Pinging...');
        const latency = msg.createdTimestamp - now;
        msg.edit(`The latency is currently around \`${latency}ms\``);
    }
};

const command1 = create_command_for_command_channel(
    async ({ message }) => {
        func({ trigger: message, is_slash: false });
    },
    'Gives the latency of the bot.',
    ['lat', 'latency'],
    undefined,
    {
        config: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Replies with your input!')
            .addStringOption((option) =>
                option.setName('input').setDescription('The input to echo back').setRequired(true),
            )
            .toJSON(),
        func: ({ interaction }) => func({ is_slash: true, trigger: interaction }),
    },
);

console.log(command1);

export const command = command1;
