import { SlashCommandBuilder } from '@discordjs/builders';
import { create_command_for_command_channel } from '../../command';

const options = ['Nice!', 'AWESOME!', 'awesome!', 'nice!', 'GREAT!', 'amazing!', 'WOOO!'];
const commandFunc = () => options[Math.floor(Math.random() * options.length)];

export const command = create_command_for_command_channel(
    async () => commandFunc(),
    'This is a basic test command',
    [],
    undefined,
    {
        config: new SlashCommandBuilder().setName('awesome').setDescription('This is a basic test command').toJSON(),
        func: async () => ({
            content: commandFunc(),
            ephemeral: true,
        }),
    },
);
