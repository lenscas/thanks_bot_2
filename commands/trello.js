const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "trello",
    aliases: ['todo', 'tlo']
}

module.exports.run = async (client, message, args) => {
    message.channel.send("View the developer's Trello board! <https://trello.com/b/d0eBHO3t/discord-bot>");
}