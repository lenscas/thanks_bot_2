import { PermissionFlagsBits } from 'discord-api-types/v10';
import { Message, TextBasedChannel } from 'discord.js';
import { create_moderator_command } from '../../command';

const commandFunc = async (
    channel: TextBasedChannel,
    amount: number,
    reply: (_: string) => Promise<void | Message>,
) => {
    if (!('bulkDelete' in channel)) {
        await reply('Can not do a bulk delete for this channel');
        return;
    }
    const message = await reply('Working on it!');
    const messages = await channel.messages.fetch({ limit: amount });
    const idsToDelete = messages
        .filter((x) => x.createdAt > new Date(Date.now() - 1000 * 60 * 60 * 24 * 14))
        .map((x) => x.id)
        .concat(message ? [message.id] : []);

    await channel.bulkDelete(idsToDelete);
};

export const command = create_moderator_command(
    async ({ message, args }) => {
        const amount = args.map((x) => Number(x)).find((x) => !isNaN(x));
        console.log(amount);
        if (!amount) {
            await message.channel.send('Could not get how many messages need to be deleted');
            return;
        }
        await commandFunc(message.channel, amount + 1, message.channel.send);
    },
    'Removes X amount of messages that are less than 2 weeks old.',
    ['del', 'remove', 'be_gone'],
    undefined,
    {
        config: (x) =>
            x
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
                .addIntegerOption((x) =>
                    x.setName('amount').setDescription('Amount of messages to delete').setRequired(true),
                )
                .toJSON(),
        func: async ({ interaction }) => {
            if (!interaction.guild) {
                return;
            }
            if (!interaction.channel) {
                return;
            }
            const amount = interaction.options.getInteger('amount', true);
            await commandFunc(interaction.channel, amount, async (x) => {
                if (interaction.replied) {
                    await interaction.editReply(x);
                } else {
                    await interaction.reply(x);
                }
            });
        },
    },
);
