import { Client, Message } from 'discord.js';
import { URL } from 'url';
import { get as levenshteinDistance } from 'fast-levenshtein';
import { muteAndReportUser } from './helpers';
import { PoolWrapper } from '../db';
import { checkIfAllUrlsAreWhitelisted } from './queries.queries';

const loadGetUrls = async (): Promise<typeof import('get-urls')> => new Function(`return import('get-urls')`)();

type offendReason = 'PingAndLinks' | 'SuspiciousLink';

export const peopleWhoSendPossibleScam: {
    [server: string]: {
        [userId: string]: {
            messagesToDelete: Array<{
                messageId: string;
                channelId: string;
            }>;
            offendDate: Date;
            reason: offendReason;
            times: number;
        };
    };
} = {};

const urls = [
    { link: 'steamcommunity.com', distance: 7 },
    {
        link: 'discord.com',
        distance: 4,
        keywords: [
            {
                name: 'discord',
                distance: 4,
            },
            {
                name: 'nitro',
                distance: 2,
            },
            {
                name: 'discordnitro',
                distance: 4,
            },
            {
                name: 'n1tro',
                distance: 2,
            },
            {
                name: 'nitrodiscord',
                distance: 4,
            },
        ],
    },
];

const getUrlsInDistance = async (arr: string[], db: PoolWrapper) => {
    const firstFilter = arr
        .map((v) => new URL(v))
        .filter((v) => urls.every((a) => a.link != v.host))
        .map((v) => {
            const partsToCheck = v.host.split('.').flatMap((v) => v.split('-'));
            return {
                url: v,
                distances: urls
                    .map((compareAgainst) => {
                        return {
                            distance: levenshteinDistance(v.host, compareAgainst.link),
                            comparedTo: compareAgainst,
                        };
                    })
                    .filter((x) => {
                        return x.distance <= x.comparedTo.distance;
                    }),
                distanceParts: urls
                    .flatMap((x) => (x.keywords ? x.keywords : []))
                    .flatMap((x) =>
                        partsToCheck.map((urlPart) => {
                            return {
                                distance: levenshteinDistance(urlPart, x.name),
                                needed: x.distance,
                            };
                        }),
                    )
                    .filter((x) => x.distance <= x.needed),
            };
        })
        .filter((v) => v.distances.length > 0 || v.distanceParts.length > 0);
    if (firstFilter.length == 0) {
        return false;
    }
    const urls_to_check = [...new Set(firstFilter.map((x) => x.url.host))];
    await checkIfAllUrlsAreWhitelisted
        .run({ urls: urls_to_check }, db)
        .then((res) => res[0].count == urls_to_check.length.toString());
};

const cleanWarningEveryMS = 300000;
export const loadCheckScam = async (): Promise<
    (message: Message, client: Client, db: PoolWrapper) => Promise<boolean>
> => {
    const getUrlz = await loadGetUrls();
    const getUrls = getUrlz.default;

    return async (message: Message, client: Client, db: PoolWrapper): Promise<boolean> => {
        try {
            if (!(message.guild && message.member)) {
                return false;
            }

            const url_strings = getUrls(message.content, { requireSchemeOrWww: true });
            const as_arr = [...url_strings.values()];
            let offended: 'None' | offendReason = 'None';
            if (await getUrlsInDistance(as_arr, db)) {
                offended = 'SuspiciousLink';
            } else if (
                as_arr.length >= 1 &&
                (message.content.includes('@everyone') || message.content.includes('@here'))
            ) {
                offended = 'PingAndLinks';
            }

            if (offended == 'None') {
                return false;
            }
            peopleWhoSendPossibleScam[message.guild.id] = peopleWhoSendPossibleScam[message.guild.id] || {};
            let warnedStruct = peopleWhoSendPossibleScam[message.guild.id][message.member.id];

            if (!warnedStruct) {
                warnedStruct = {
                    messagesToDelete: [],
                    offendDate: new Date(),
                    reason: offended,
                    times: 0,
                };
            }

            let content =
                '***WARNING!*** ⚠\nPossible scam link detected.\n' +
                message.member.toString() +
                ' please refrain from sending links to this site. Next offense will result in automatic moderator action.';
            if (warnedStruct.reason == 'PingAndLinks') {
                content =
                    '***WARNING! ⚠***\nLinks inside messages that ping everyone/here are often scam messages.\nYes, this _especially_ includes discord server invites.\n\n' +
                    message.member.toString() +
                    ', Please, do not send messages like this in the future or automatic moderating actions will be taken';
            }
            const promise = message.reply({
                content,
            });
            warnedStruct.times++;
            warnedStruct.messagesToDelete.push({ messageId: message.id, channelId: message.channelId });
            peopleWhoSendPossibleScam[message.guild.id][message.member.id] = warnedStruct;
            if (
                (warnedStruct.reason == 'PingAndLinks' && warnedStruct.times < 3) ||
                ((warnedStruct.reason == 'SuspiciousLink' || offended == 'SuspiciousLink') &&
                    warnedStruct.times < 2 &&
                    warnedStruct.offendDate.getTime() < Date.now() - cleanWarningEveryMS)
            ) {
                await promise;
                return true;
            }

            const success = (
                await muteAndReportUser(
                    message.member,
                    message.guild,
                    db,
                    [
                        {
                            authorId: message.member?.id,
                            date: message.createdAt,
                            authorName: message.author.username,
                            content: message.content,
                        },
                    ],
                    'possible scam',
                )
            )[0];
            try {
                await message.member.send(
                    'You have sent too many messages with suspicious links and have been automatically muted to prevent further incidents.\nPlease contact a moderator.',
                );
            } catch (_) {}
            if (!success) {
                await message.channel.send('Possible scam detected, but could not properly report it.');
            }
            await promise;
            await message.delete();
            try {
                const promises = warnedStruct.messagesToDelete.map(async (x) => {
                    try {
                        const channel = await message.guild?.channels.resolve(x.channelId)?.fetch();
                        if (channel?.isText() || channel?.isThread()) {
                            const message = await channel.messages.fetch(x.messageId);
                            await message.delete();
                        }
                    } catch (e) {
                        console.log('failure to delete a scam message');
                        console.log('Channel Id: ', x.channelId + '\nmessage id: ' + x.messageId);
                        console.error(e);
                    }
                });
                await Promise.all(promises);
            } catch (x) {
                console.error(x);
            }
            return true;
        } catch (e) {
            console.error(e);
            try {
                await message.channel.send('Something has gone wrong while checking if a message was a scam.');
            } catch (e) {
                console.log('failed writing a failure message');
                console.error(e);
            }
            return true;
        }
    };
};
setInterval(() => {
    const cleaningTime = Date.now() - cleanWarningEveryMS;
    console.log(peopleWhoSendPossibleScam);
    Object.keys(peopleWhoSendPossibleScam).forEach((x) => {
        const channels = peopleWhoSendPossibleScam[x];
        Object.keys(channels).forEach((k) => {
            const channel = channels[k];
            console.log(channel.offendDate.getTime(), cleaningTime);
            if (channel.offendDate.getTime() < cleaningTime) {
                console.log('got here?');
                delete peopleWhoSendPossibleScam[x][k];
            }
        });
    });
    console.log(peopleWhoSendPossibleScam);
}, cleanWarningEveryMS);
