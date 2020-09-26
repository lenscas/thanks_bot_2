import { Client, MessageEmbed } from 'discord.js';

//the original code for the ghost ping detection comes from https://github.com/harshhh-dev/harsh-bot/blob/e32548b6467879bf62a673d69ad0ed94c7c1b2e7/index.js#L113
//however it has been edited to also work with role pings
export function enableGhostPingDetection(client: Client): void {
    client.on('messageUpdate', async (oldMessage, newMessage) => {
        if (!oldMessage.guild) return;

        if (!(oldMessage.mentions.members?.first() || oldMessage.mentions.roles.first())) {
            return;
        }

        let hasRemovedPing = !!(!newMessage.mentions.members && oldMessage.mentions.members);
        hasRemovedPing =
            hasRemovedPing ||
            !!oldMessage.mentions.members?.every((x) => !!newMessage.mentions.members?.find((y) => y.id == x.id));
        hasRemovedPing =
            hasRemovedPing ||
            oldMessage.mentions.roles.every((x) => !!newMessage.mentions.roles.find((y) => y.id == x.id));

        if (hasRemovedPing) {
            const embed = new MessageEmbed()
                .setColor('#ff6a6a')
                .setTitle('Ghost ping detected!')
                .addField('**Author**', oldMessage.author)
                .addField('**Origional Message**', oldMessage, true)
                .addField('**New Message**', newMessage, true)
                .addField('**Type**', 'Sender sent a message. Then proceeded to edit the ping out of the message.')
                .setTimestamp();
            await oldMessage.channel.send(embed);
        }
    });

    client.on('messageDelete', async (message) => {
        if (!message.guild) return;

        if (message.mentions.members?.first() || message.mentions.roles.first()) {
            const embed = new MessageEmbed()
                .setColor('#ff6a6a')
                .setTitle('Ghost ping detected!')
                .addField('**Sender**', message.author)
                .addField('**Message**', message.content)
                .addField('**Type**', 'Sender sent a message, and then proceeded to delete it thereafter.')
                .setTimestamp();
            await message.channel.send(embed);
        }
    });
}
