const Discord = require('discord.js')
const fs = require('fs')

module.exports.config = { 
    name: "addart",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send('Please tell me what you would like to search!')
    else {
        let search = args.join('+')

        message.channel.send(`I think https://www.google.com/search?q=${search}  might help you find your answer!`)
    }
}