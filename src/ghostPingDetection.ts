import { Client, MessageEmbed } from 'discord.js';

//the original code for the ghost ping detection comes from https://github.com/harshhh-dev/harsh-bot/blob/e32548b6467879bf62a673d69ad0ed94c7c1b2e7/index.js#L113
//however it has been edited to also work with role pings
export function enableGhostPingDetection(client: Client): void {
    client.on('messageUpdate', async (oldMessage, newMessage) => {
        if (!oldMessage.guild) return;

        const hasRemovedPing =
            //check if there was a members ping
            (oldMessage.mentions.members?.first() &&
                //check if there is 1 members ping that is not inside the new message
                oldMessage.mentions.members?.some((x) => !!newMessage.mentions.members?.every((y) => y.id != x.id))) ||
            //do the same but now for roles
            (oldMessage.mentions.roles.first() &&
                oldMessage.mentions.roles?.some((x) => !!newMessage.mentions.roles?.every((y) => y.id != x.id)));

        if (hasRemovedPing) {
            const embed = new MessageEmbed()
                .setColor('#ff6a6a')
                .setTitle('Ghost ping detected!')
                .addField('**Author**', oldMessage.author?.toString() ?? '');
            if (oldMessage.mentions.members && oldMessage.mentions.members.size > 0) {
                embed.addField(
                    'Pinged user(s):',
                    oldMessage.mentions.members?.map((v) => v.toString()).join(' '),
                    true,
                );
            }
            if (oldMessage.mentions.roles.size > 0) {
                embed.addField('pinged role(s):', oldMessage.mentions.roles.map((v) => v.toString()).join(' '), true);
            }
            embed.setTimestamp();
            await oldMessage.channel.send({ embeds: [embed] });
        }
    });

    client.on('messageDelete', async (message) => {
        if (!message.guild) return;

        if (message.mentions.members?.first() || message.mentions.roles.first()) {
            const embed = new MessageEmbed()
                .setColor('#ff6a6a')
                .setTitle('Ghost ping detected!')
                .addField('**Sender**', message.author?.toString() ?? '');
            if (message.mentions.members && message.mentions.members.size > 0) {
                embed.addField('pinged user(s):', message.mentions.members.map((v) => v.toString()).join(' '), true);
            }
            if (message.mentions.roles.size > 0) {
                embed.addField('pinged role(s):', message.mentions.roles.map((v) => v.toString()).join(' '), true);
            }

            embed.setTimestamp();
            await message.channel.send({ embeds: [embed] });
        }
    });
}
