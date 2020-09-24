const Discord = require('discord.js')


module.exports.config = { 
    name: "bug",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    message.channel.send('Found a bug? You can either inform me by adding to to my trello list (!suggest), or create any issue on GitHub! <https://github.com/harshhh-dev/harsh-bot/issues>')
}