const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "github",
    aliases: ['git', 'repo', 'source']
}

module.exports.run = async (client, message, args) => {
    message.channel.send("My repository on GitHub! https://github.com/harshhh-dev/harsh-bot (Make sure to star 😉)");
}