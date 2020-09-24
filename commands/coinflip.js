const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "coinflip",
    aliases: ['flip', 'cf']
}

module.exports.run = async (client, message, args) => {
    let random = (Math.floor(Math.random() * Math.floor(2)));

    if (random == 0) message.channel.send('I flipped tails!')
    else message.channel.send('I flipped heads!')
}