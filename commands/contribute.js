const Discord = require('discord.js')


module.exports.config = { 
    name: "contribute",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    message.channel.send('Want to contribute to my source code? Create fork my repository at <https://github.com/harshhh-dev/harsh-bot> and create a Pull Request! If the developer likes the changes you\'ve made, he\'ll add it to my source code!')
}