import { Client, Message } from 'discord.js';
import { URL } from 'url';
import { get as levenshteinDistance } from 'fast-levenshtein';
import { muteAndReportUser } from './helpers';
import { PoolWrapper } from '../db';
import { checkIfAllUrlsAreWhitelisted } from './queries.queries';

const loadGetUrls = async (): Promise<typeof import('get-urls')> => new Function(`return import('get-urls')`)();

export const peopleWhoSendPossibleScam: {
    [server: string]: {
        [userId: string]: {
            messageToDelete: {
                messageId: string;
                channelId: string;
            };
            offendDate: Date;
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
            const links_in_range = as_arr
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
            if (links_in_range.length == 0) {
                return false;
            }
            const urls_to_check = [...new Set(links_in_range.map((x) => x.url.host))];
            const every_url_is_safe = await checkIfAllUrlsAreWhitelisted
                .run({ urls: urls_to_check }, db)
                .then((res) => res[0].count == urls_to_check.length.toString());

            peopleWhoSendPossibleScam[message.guild.id] = peopleWhoSendPossibleScam[message.guild.id] || {};
            if (every_url_is_safe) {
                return false;
            }
            let warnedStruct = peopleWhoSendPossibleScam[message.guild.id][message.member.id];
            if (!warnedStruct || warnedStruct.offendDate.getTime() < Date.now() - cleanWarningEveryMS) {
                warnedStruct = {
                    messageToDelete: {
                        messageId: message.id,
                        channelId: message.channel.id,
                    },
                    offendDate: new Date(),
                };
                peopleWhoSendPossibleScam[message.guild.id][message.member.id] = warnedStruct;
                const content =
                    '***WARNING!***\nPossible scam link detected.\n' +
                    message.member.toString() +
                    ' please refrain from sending links to this site. Next offence will result in automatic moderator action.';
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await (client as any).api.channels[message.channel.id].messages.post({
                    data: {
                        content,
                        message_reference: {
                            message_id: message.id,
                            channel_id: message.channel.id,
                            guild_id: message.guild.id,
                        },
                    },
                });

                return true;
            }

            const success = await muteAndReportUser(
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
            );
            try {
                message.member.send(
                    'You have sent too many messages with suspicious links and have been automatically muted to prevent further incidents.\nPlease contact a moderator.',
                );
            } catch (_) {}
            if (!success) {
                await message.channel.send('Possible scam detected, but could not properly report it.');
            }

            await message.delete();
            try {
                await message.guild.channels
                    .resolve(warnedStruct.messageToDelete.channelId)
                    ?.fetch()
                    .then((x) => {
                        if (x.isText()) {
                            return x.messages.delete(warnedStruct.messageToDelete.messageId);
                        }
                    });
            } catch (_) {}
            return true;
        } catch (e) {
            console.error(e);
            try {
                await message.channel.send('Something has gone wrong while checking if a message was a scam.');
            } catch (e) {}
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
