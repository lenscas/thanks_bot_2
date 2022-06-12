import { APIInteractionDataResolvedChannel, ChannelType, PermissionFlagsBits } from 'discord-api-types/v10';
import { AnyChannel, Guild } from 'discord.js';
import { create_moderator_command } from '../../../command';
import { PoolWrapper } from '../../../db';
import { setCommandChannel } from '../queries.queries';

const commandFunc = async (
    db: PoolWrapper,
    guild: Guild,
    channel: AnyChannel | APIInteractionDataResolvedChannel | null,
) => {
    await setCommandChannel.run({ channel_id: channel?.id, server_id: guild.id }, db);
};

export const command = create_moderator_command(
    async ({ message, db, args }) => {
        if (!message.guild) {
            return;
        }
        const channelsAsArr = message.mentions.channels.map((x) => x);
        if (channelsAsArr.length > 1) {
            return 'Only 1 channel can be set as command channel.';
        }
        const usedNone = args[0] == 'NONE';
        if (channelsAsArr.length == 0 && !usedNone) {
            return "If you don't want to set a channel. give `NONE` as the argument.";
        }
        const channel = channelsAsArr[0] ?? null;
        await commandFunc(db, message.guild, channel);
        return 'Done.';
    },
    'Sets up a channel to limit some commands to.',
    ['setcommandchannel', 'setchannel', 'set_channel', 'set_command_channel'],
    undefined,
    {
        config: (x) =>
            x
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
                .addChannelOption((x) =>
                    x
                        .addChannelTypes(ChannelType.GuildText)
                        .setDescription('Channel to limit some commands to')
                        .setName('channel'),
                )
                .toJSON(),
        func: async ({ db, interaction }) => {
            if (!interaction.guild) {
                return;
            }
            const x = interaction.options.getChannel('channel');
            await commandFunc(db, interaction.guild, x);
        },
    },
);
