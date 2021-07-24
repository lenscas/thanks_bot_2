import { Client, Message } from 'discord.js';
import getUrls from 'get-urls';
import { URL } from 'url';
import { get as levenshteinDistance } from 'fast-levenshtein';
import { muteAndReportUser } from './helpers';
import { PoolWrapper } from '../db';

const steamHost = 'steamcommunity.com';
const range = 7;

export const checkScam = async (message: Message, client: Client, db: PoolWrapper): Promise<boolean> => {
    try {
        if (!(message.guild && message.member)) {
            return false;
        }
        const url_strings = getUrls(message.content, { requireSchemeOrWww: true });
        const as_arr = [...url_strings.values()];
        const has_link_in_range = as_arr
            .map((v) => new URL(v))
            .filter((v) => v.host != steamHost)
            .map((v) => ({ url: v, distance: levenshteinDistance(v.host, steamHost) }))
            .some((v) => {
                console.log(v.url.host + ' had a distance of: ' + v.distance + '%');
                return v.distance <= range;
            });
        if (!has_link_in_range) {
            return false;
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
        if (!success) {
            await message.channel.send('Possible scam detected, but could not properly report it.');
        }

        await message.delete({ reason: 'Most likely a scam!' });
        return true;
    } catch (e) {
        console.error(e);
        try {
            await message.channel.send('Something has gone wrong while checking if a message was a scam.');
        } catch (e) {}
    }
    return false;
};
