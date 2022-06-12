import { checkIfChannelIsText } from '../_base';
import { create_moderator_command } from '../../../command';
import { updateSpamProtectionConfig } from './queries.queries';
import { getMuteRole } from '../queries.queries';
import { PoolWrapper } from '../../../db';
import { Client, Guild } from 'discord.js';
import { ChannelType, PermissionFlagsBits } from 'discord-api-types/v10';

const commandFunc = async (db: PoolWrapper, client: Client, channel: string, mute_role: string, guild: Guild) => {
    const check = await checkIfChannelIsText(client, channel);
    if (check !== true) {
        return check;
    }
    await updateSpamProtectionConfig.run({ channel_id: channel, role_id: mute_role, server_id: guild.id }, db);
    const muteRole = (await getMuteRole.run({ server_id: guild.id }, db))[0];
    if (!muteRole.mute_role) {
        return 'Spam protection set BUT no mute role configured.\nThis will result in the protection ***NOT*** working.\nuse !setMuteRole to configure a mute role.';
    }

    return 'Updated spam protection.';
};

export const command = create_moderator_command(
    async ({ message, db, client }) => {
        if (!message.guild) {
            return;
        }
        const channel = message.mentions.channels.first()?.id;
        if (!channel) {
            return 'I need exactly 1 channel mention that I can use to put context in on why I muted people';
        }
        const check = await checkIfChannelIsText(client, channel);
        if (check !== true) {
            return check;
        }
        const roleId = message.mentions.roles.first()?.id;
        if (!roleId) {
            return `I need exactly 1 role mention to configure which role I need to use as a marker on who I muted.\nI still use the configured muted role to actually mute people`;
        }
        commandFunc(db, client, channel, roleId, message.guild);
    },
    'Sets up which role to use as a marker on who I muted and where to report cases to.',
    [],
    undefined,
    {
        config: (x) =>
            x
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
                .addChannelOption((x) =>
                    x
                        .setName('report_channel')
                        .setDescription('Channel that reports need to go to')
                        .addChannelTypes(ChannelType.GuildText),
                )
                .addRoleOption((x) =>
                    x
                        .setName('marker_role')
                        .setDescription('role that acts as a marker for automatic moderation actions'),
                )
                .toJSON(),
        func: async ({ interaction, db, client }) => {
            if (!interaction.guild) {
                return;
            }
            const markerRole = interaction.options.getRole('marker_role', true);
            const channel = interaction.options.getChannel('report_channel', true);
            return {
                ephemeral: true,
                content: await commandFunc(db, client, channel.id, markerRole.id, interaction.guild),
            };
        },
    },
);
