import { PermissionFlagsBits } from 'discord-api-types/v10';
import { create_moderator_command } from '../../../command';
import { PoolWrapper } from '../../../db';
import { endSubmission } from '../queries.queries';

const commandFunc = async (channel_id: string, guild_id: string, db: PoolWrapper) => {
    const channelToCopyFrom = await endSubmission
        .run({ from_channel: channel_id, server_id: guild_id }, db)
        .then((x) => x[0]?.stored_channel);
    if (!channelToCopyFrom) {
        return "It doesn't look like a submission is going on in this channel.";
    }
    return `I ended the submission time. Now, all you have to do is show <#${channelToCopyFrom}>. I would do it myself, but my creator is too lazy to let me do that :(`;
};

export const command = create_moderator_command(
    async ({ message, db }) => {
        if (!message.guild) {
            return;
        }
        return await commandFunc(message.channel.id, message.guild.id, db);
    },
    'This ends the secret submission time',
    undefined,
    undefined,
    {
        config: (x) => x.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers).toJSON(),
        func: async ({ interaction, db }) => {
            if (!interaction.guild) {
                return;
            }
            return {
                ephemeral: true,
                content: await commandFunc(interaction.channelId, interaction.guild.id, db),
            };
        },
    },
);
