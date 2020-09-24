const Discord = require('discord.js')

module.exports.config = { 
    name: "avatar",
    aliases: ['avat', 'pfp']
}

module.exports.run = async (client, message, args) => {
   const member = message.mentions.members.last();

   if (!member) return message.channel.send('User not found!')

   const userInfoEmbed = new Discord.MessageEmbed()
   .setColor('#00B6FF')
   .setThumbnail(`${member.user.displayAvatarURL()}`)
   .setTitle(`${member.user.username}'s avatar!`)

   if (!args[0]) message.channel.send('Please specify a user!')

   message.channel.send(userInfoEmbed);
}