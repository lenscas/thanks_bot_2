const Discord = require('discord.js')
const ms = require('ms')

module.exports.config = { 
    name: "mute",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Access Denied');
    else {
        let muteMember = message.mentions.members.first()
        if (!muteMember) return message.channel.send('User not found!')

        let muteRole = message.guild.roles.cache.find(role => role.name ==  "muted")
        if(!muteRole) return message.channel.send('Mute role not found!')

        let muteTime = args[1]
        if (!muteTime) return message.channel.send('Please specify a time!')

        await(muteMember.roles.add(muteRole.id));
        const muteEmbed = new Discord.MessageEmbed()
        .setTitle('**User Muted**')
        .addField('**User**', `<@${muteMember.id}>`)
        .addField('**Muted By**', `<@${message.author.id}>`)
        .addField('**Mute Duration**', `${muteTime}`)

        message.channel.send(muteEmbed);

        setTimeout(function () {
            muteMember.send('You have been unmuted in **Making Games Together**. Please make sure to behave and make it a fun and enjoyable experience for everyone.')
            muteMember.roles.remove(muteRole.id);
        }, ms(muteTime));
    }
}