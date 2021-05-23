import { Guild, GuildMember, Message, MessageAttachment, TextChannel, User } from 'discord.js';
import { PoolWrapper } from './db';
import { getAntiSpamConfig } from './queries.queries';

const lookBackForMS = 2000;
const cleanTimeMessages = 3000;
const cleanTimeWarnings = 6000;

const muteThreshold = 5;
const warnThreshold = 3;

const enabledServers: {
    [serverId: string]: {
        muteRole: string;
        mutedMarkerRole: string;
        reportChannel: string;
        warnedUsers: { [userId: string]: { timeStamp: number; gotWarnedAt: number } };
    };
} = {};

type CachedMessage = {
    serverId: string;
    author: User;
    createdAt: number;
    content: string;
};

export const messagesToFile = (messages: Array<Omit<CachedMessage, 'serverId'>>): Buffer => {
    const asString = messages
        .map((x) => {
            return {
                date: x.createdAt,
                authorName: x.author.username,
                authorId: x.author.id,
                content: x.content,
            };
        })
        .map(
            (partial) =>
                `${new Date(partial.date).toDateString()} ${partial.authorName} (${partial.authorId}) : ${
                    partial.content
                }`,
        )
        .join('\n-------\n');
    return Buffer.from(asString, 'utf-8');
};

let cachedMessages: Array<CachedMessage> = [];

export const enableSpamProtection = async (serverId: string, db: PoolWrapper): Promise<string> => {
    const config = (await getAntiSpamConfig.run({ server_id: serverId }, db))[0];
    if (!(config && config.channel_report_mutes && config.muted_marker_role)) {
        return 'Anti spam is not configured. Configure it using !configureSpamProtection';
    }
    if (!config.mute_role) {
        return 'No mute role selected. Configure it using !setMuteRole';
    }
    enabledServers[serverId] = {
        mutedMarkerRole: config.muted_marker_role,
        muteRole: config.mute_role,
        reportChannel: config.channel_report_mutes,
        warnedUsers: {},
    };
    return 'Spam protection enabled';
};
export const disableSpamProtection = (serverId: string): string => {
    delete enabledServers[serverId];
    return 'Spam protection disabled';
};

export const checkSpam = async (message: Message): Promise<boolean> => {
    if (!(message.member?.id && message.guild && message.guild.id in enabledServers)) {
        return false;
    }
    if (message.author.bot == true) {
        return false;
    }

    const server = enabledServers[message.guild.id];

    const guild = message.guild;

    cachedMessages.push({
        createdAt: message.createdTimestamp,
        serverId: message.guild.id,
        author: message.author,
        content: message.content,
    });
    const lookBackUntil = message.createdTimestamp - lookBackForMS;
    const interestingMessages = cachedMessages.filter(
        (x) => x.serverId == guild.id && x.createdAt > lookBackUntil && x.author.id == message.author.id,
    );
    const countMessages = interestingMessages.length;
    const warningGotSend = server.warnedUsers[message.member.id]
        ? server.warnedUsers[message.member.id].gotWarnedAt < message.createdTimestamp
        : false;
    if (countMessages > muteThreshold && warningGotSend) {
        await muteUser(message, message.guild, message.member, interestingMessages, server);
        return true;
    }
    if (countMessages > warnThreshold) {
        if (message.member.id in server.warnedUsers && warningGotSend) {
            await muteUser(message, message.guild, message.member, interestingMessages, server);
            return true;
        }

        const res = await message.channel.send(
            `Warning: ${message.author.toString()} stop spamming or you ***WILL*** be muted.`,
        );
        server.warnedUsers[message.member.id] = {
            timeStamp: message.createdTimestamp,
            gotWarnedAt: res.createdTimestamp,
        };
        return true;
    }
    return false;
};
setInterval(() => {
    const cleaningTime = Date.now() - cleanTimeMessages;
    cachedMessages = cachedMessages.filter((x) => x.createdAt > cleaningTime);
}, cleanTimeMessages);
setInterval(() => {
    const cleaningTime = Date.now() - cleanTimeWarnings;
    Object.keys(enabledServers).forEach((v) => {
        const server = enabledServers[v];
        Object.keys(server.warnedUsers).forEach((x) => {
            if (server.warnedUsers[x].timeStamp < cleaningTime) {
                delete server.warnedUsers[x];
            }
        });
    });
}, cleanTimeWarnings);

const muteUser = async (
    message: Message,
    guild: Guild,
    member: GuildMember,
    messages: Array<CachedMessage>,
    server: typeof enabledServers['a'],
) => {
    try {
        await Promise.all([
            member.roles.add(server.muteRole, 'spamming'),
            member.roles.add(server.mutedMarkerRole, 'spamming'),
        ]);
        const asBuffer = messagesToFile(messages);

        const attachment = new MessageAttachment(asBuffer, 'messages.txt');

        const channel = guild.channels.cache.find((x) => x.id == server.reportChannel);
        if (!channel) {
            await message.channel.send('Could not get the evidence channel');
            return;
        }
        //discord.js' types can be improved....
        if (!((channel): channel is TextChannel => channel.type === 'text')(channel)) {
            await message.channel.send('Evidence channel is not a text channel');
            return;
        }
        await channel.send({
            content: `${message.author.username} ${member.nickname} <@${member.id}>`,
            files: [attachment],
        });
        await message.channel.send('You have been muted for spamming.');
    } catch (e) {
        await message.channel.send('Could not properly mute :(');
        console.error(e);
    }
};
