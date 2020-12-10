import { Guild, GuildMember, Message } from 'discord.js';
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
