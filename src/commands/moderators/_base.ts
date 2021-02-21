import { Client, Guild, GuildMember, Message } from 'discord.js';
import { PoolWrapper } from '../../db';
import { getMuteRole } from './queries.queries';

export const getMutedRoleId = async (server: Guild, db: PoolWrapper): Promise<string | null> => {
    const role = await getMuteRole.run({ server_id: server.id }, db).then((x) => x[0]?.mute_role);
    if (!role) {
        return server.roles.cache.find((x) => x.name == 'Muted')?.id || null;
    }
    return role;
};

export const addMuteRole = async (
    to_mute: GuildMember,
    server: Guild,
    channel: Message['channel'],
    db: PoolWrapper,
): Promise<boolean> => {
    const role = await (async () => {
        const role = await getMuteRole.run({ server_id: server.id }, db).then((x) => x[0]?.mute_role);
        if (!role) {
            return server.roles.cache.find((x) => x.name == 'Muted');
        }
        return role;
    })();

    if (role) {
        await to_mute.roles.add(role);
        return true;
    } else {
        await channel.send('Could not find mute role. Did not mute this person.');
        return false;
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
        if (!res_channel.isText()) {
            return 'The given channel is not a text channel.';
        }
    } catch (e) {
        return 'Could not fetch the given channel';
    }
    return true;
};
