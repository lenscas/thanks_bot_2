import { ChannelType, PermissionFlagsBits } from 'discord-api-types/v10';
import { create_moderator_command } from '../../../command';
import { PoolWrapper } from '../../../db';
import { checkIfChannelsAreAlreadyUsed, enableSubmissionChannel } from '../queries.queries';

const commandFunc = (from_channel_id: string, to_channel_id: string, guild_id: string, db: PoolWrapper) => {
    return db.startTransaction(async (db) => {
        const params = {
            server_id: guild_id,
            from_channel: from_channel_id,
            to_channel: to_channel_id,
        };
        const res = await checkIfChannelsAreAlreadyUsed
            .run(params, db)
            .then((x) => x[0])
            .then((x) => ({
                from_channel_free: x.from_channel_count == '0',
                stored_channel_free: x.stored_channel_count == '0',
            }));
        if (!res.from_channel_free) {
            return 'This channel is already being used for hidden submissions';
        }
        if (!res.stored_channel_free) {
            return 'The given channel is already being used to store hidden submissions';
        }
        await enableSubmissionChannel.run(params, db);
        return 'The hidden submission is setup. Use !endSubmission in this channel to end it';
    });
};

export const command = create_moderator_command(
    async ({ message, db }) => {
        if (!message.guild) {
            return;
        }
        if (message.mentions.channels.size > 1) {
            return 'You can only specify 1 channel that submissions are going to be stored in';
        }
        const channel = message.mentions.channels.first();
        if (!channel) {
            return 'You need to specify 1 channel that submissions are going to be stored in';
        }
        return await commandFunc(message.channel.id, channel.id, message.guild.id, db);
    },
    'Enables a channel to receive hidden submissions.',
    undefined,
    undefined,
    {
        config: (x) =>
            x
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
                .addChannelOption((x) =>
                    x
                        .setName('channel')
                        .setDescription('Channel to move posts over to')
                        .addChannelTypes(ChannelType.GuildText),
                )
                .toJSON(),
        func: async ({ interaction, db }) => {
            if (!interaction.guild) {
                return;
            }
            const channelTo = interaction.options.getChannel('channel', true);
            const channelFrom = interaction.channelId;
            return {
                ephemeral: true,
                content: await commandFunc(channelFrom, channelTo.id, interaction.guild.id, db),
            };
        },
    },
);
