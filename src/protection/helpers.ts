import { Guild, GuildMember, MessageAttachment } from 'discord.js';
import { PoolWrapper } from '../db';
import { getProtectionConfig } from './queries.queries';

export type LogMessage = { date: Date; authorName: string; authorId: string; content: string };

export const messagesToFile = (messages: Array<LogMessage>): Buffer => {
    const asString = messages
        .map(
            (partial) =>
                `${partial.date.toDateString()} ${partial.authorName} (${partial.authorId}) : ${partial.content}`,
        )
        .join('\n-------\n');
    return Buffer.from(asString, 'utf-8');
};

export const muteAndReportUser = async (
    member: GuildMember,
    server: Guild,
    db: PoolWrapper,
    messagesToLog: LogMessage[],
    reason: string,
): Promise<[false] | [false, string] | [true, string]> => {
    const config = await getProtectionConfig.run({ server_id: server.id }, db).then((v) => v[0]);
    if (!(config && config.channel_report_mutes && config.mute_role && config.muted_marker_role)) {
        return [false];
    }
    await Promise.all([member.roles.add(config.mute_role, reason), member.roles.add(config.muted_marker_role, reason)]);
    const asBuffer = messagesToFile(messagesToLog);

    const attachment = new MessageAttachment(asBuffer, 'messages.txt');

    const channel = server.channels.cache.find((x) => x.id == config.channel_report_mutes);
    if (!channel) {
        return [false, config.mute_role];
    }
    if (!channel.isText()) {
        return [false, config.mute_role];
    }
    await channel.send({
        content: `${member.user.username} ${member.nickname} <@${member.id}>`,
        files: [attachment],
    });
    return [true, config.mute_role];
};
