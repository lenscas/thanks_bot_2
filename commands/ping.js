const Discord = require('discord.js')

module.exports.config = { 
    name: "ping",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    const msg = await message.channel.send('Pinging...')
    const latency = msg.createdTimestamp - message.createdTimestamp
    const choices = ['Is this really my ping?', 'Is this okay? I can\'t looK!', 'I hope it isn\'t bad!'];
    const response = choices[Math.floor(Math.random() * choices.length)];

    msg.edit(`The latency current is around \`${latency}ms\``)
}