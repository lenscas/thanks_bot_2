const Discord = require('discord.js')

module.exports.config = { 
    name: "asking",
    aliases: ['ask', 'ques']
}

module.exports.run = async (client, message, args) => {
    message.channel.send('Please just ask your question. Don\'t ask to ask. Don\'t ask for topic experts or DMs. Don\'t ping random users. Skip the formalities and ask away! https://dontasktoask.com/')
}