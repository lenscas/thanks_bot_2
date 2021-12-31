import Axios from 'axios';
import { Message, MessageAttachment } from 'discord.js';
import { PoolWrapper } from './db';
import { getChannelToCopySubmissionsTo } from './queries.queries';

export async function dealWithPossibleSubmission(message: Message, db: PoolWrapper): Promise<boolean> {
    if (!message.guild) {
        return true;
    }
    if (message.attachments.size == 0) {
        console.log('length is 0');
        return true;
    }
    const res = await getChannelToCopySubmissionsTo
        .run({ server_id: message.guild.id, current_channel: message.channel.id }, db)
        .then((x) => x[0]);
    if (!res) {
        console.log('No channel found');
        return true;
    }
    const channel = message.guild.channels.cache.find((x) => x.id == res.stored_channel);
    if (!channel) {
        message.channel.send('Could not find the stored channel');
        return false;
    }
    if (!channel.isText()) {
        await message.channel.send('Could not submit, stored channel is of wrong type.');
        return false;
    }
    await Promise.all(
        message.attachments
            .map((x) => ({
                content: `author: <@${message.author.id}>`,
                file: x.attachment,
                name: x.name,
            }))
            .map(async (x) => {
                console.log(x.file);
                if (typeof x.file == 'string') {
                    x.file = await Axios.get(x.file, { responseType: 'stream' }).then((x) => x.data);
                }
                return {
                    content: x.content,
                    file: new MessageAttachment(x.file, x.name ?? 'submission.txt'),
                };
            })
            .map(async (x) =>
                x.then(async (x) => {
                    return await channel.send({ files: [x.file], content: x.content });
                }),
            ),
    );
    await message.channel.send('Your submission has been submitted');
    await message.delete();
    return false;
}
