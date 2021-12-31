import { create_moderator_command } from '../../command';
import { MessageAttachment } from 'discord.js';
import { addMuteRole } from './_base';
import { cachedMessagesToFile } from '../../protection/spam';

export const command = create_moderator_command(
    async ({ message, args, db }) => {
        const mentioned = message.mentions.members;
        if (!message.guild) {
            return;
        }
        if (mentioned?.size ?? 0 > 1) {
            await message.channel.send('I can only prepare 1 person at a time. Please only ping 1 person');
            return;
        }
        const personToBan = mentioned?.first();
        if (!personToBan) {
            await message.channel.send("can't prepare a ban without mentioning WHO to prepare for ban");
            return;
        }
        const fut = addMuteRole(personToBan, message.guild, message.channel, db);
        const messageAmount = args.map((x) => Number(x)).find((x) => !isNaN(x));
        await fut;
        if (!messageAmount) {
            await message.channel.send('Could not get how many messages to store.');
            await fut;
            return;
        }
        const messages = await message.channel.messages.fetch({ before: message.id, limit: messageAmount });
        const channel = message.guild.channels.cache.find((x) => x.name == 'ban-reason');

        const asBuffer = cachedMessagesToFile(messages.map((v) => ({ ...v, createdAt: v.createdAt.getTime() })));

        const attachment = new MessageAttachment(asBuffer, 'messages.txt');
        if (!channel) {
            await message.channel.send('Could not get the evidence channel');
            return;
        }
        //discord.js'es types can be improved....
        if (!channel.isText()) {
            await message.channel.send('Evidence channel is not a text channel');
            return;
        }
        channel.send({
            content: `${personToBan.user.username} ${personToBan.nickname} <@${personToBan.id}>`,
            files: [attachment],
        });
    },
    'Prepares someone to get banned by muting them and by copying the given amount of messages to the log channel',
    ['ban', 'prep_ban', 'prepban'],
);
