import { Client, Guild, GuildMember, Message, Role, TextBasedChannel } from 'discord.js';
import { PoolWrapper } from '../../db';
import { LogMessage } from '../../protection/helpers';
import { getMuteRole } from './queries.queries';

export const getMutedRole = async (server: Guild, db: PoolWrapper): Promise<string | Role | null> => {
    const role = await getMuteRole.run({ server_id: server.id }, db).then((x) => x[0]?.mute_role);
    if (!role) {
        return server.roles.cache.find((x) => x.name == 'Muted') || null;
    }
    return role;
};

export const addMuteRole = async (
    to_mute: GuildMember,
    server: Guild,
    channel: Message['channel'],
    db: PoolWrapper,
): Promise<[true, string | Role] | [false]> => {
    const role = await getMutedRole(server, db);
    if (role) {
        await to_mute.roles.add(role);
        return [true, role];
    } else {
        await channel.send('Could not find mute role. Did not mute this person.');
        return [false];
    }
};
export const removeFirstLine = (input: string): string => {
    const inputArray = input.split('\n');
    inputArray.shift();
    return inputArray.join('\n').trim();
};

export type getChannelIdFromMentionRes = { id: string } | { error: string };

export const getChannelIdFromMention = (mention: string): getChannelIdFromMentionRes => {
    if (!mention.startsWith('<#')) {
        return { error: "Channel id's should start with a `<#" };
    }
    if (!mention.endsWith('>')) {
        return { error: "Channel id's should end with a `>" };
    }
    return { id: mention.slice(2, -1) };
};
export const checkIfChannelIsText = async (client: Client, channelId: string): Promise<string | true> => {
    try {
        const res_channel = await client.channels.fetch(channelId);
        if (!res_channel) {
            return 'channel does not exist';
        }
        if (!res_channel.isText()) {
            return 'The given channel is not a text channel.';
        }
    } catch (e) {
        return 'Could not fetch the given channel';
    }
    return true;
};

export const getMessagesToLog = async (channel: TextBasedChannel, amount: number): Promise<Array<LogMessage>> =>
    (await channel.messages.fetch({ limit: amount })).map((x) => ({
        authorId: x.author.id,
        authorName: x.author.username,
        content: x.content,
        date: x.createdAt,
    }));
