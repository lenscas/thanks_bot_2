const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "bam",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    message.channel.send("User has been bammed");
}