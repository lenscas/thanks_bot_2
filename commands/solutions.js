const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "solutions",
    aliases: ['🥄', 'spoonfeeding']
}

module.exports.run = async (client, message, args) => {
    message.channel.send("If you are asking in help channels, the people are not there to give exact answers to your problems! Rather, they will help you understand the problem, so when in the future, you know how to tackle unique problems when you get them!");
}