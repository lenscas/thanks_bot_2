const Discord = require('discord.js')

module.exports.config = { 
    name: "social",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    if (!args[0]) message.channel.reply('Please tell me which one of his socials you would like a link to!')

    if (args == 'twitter' || args == 'twit') message.channel.send('Follow Jonas on Twitter! https://twitter.com/JonasTyroller')
    else if (args == 'youtube' || args == 'yt') message.channel.send('Subscribe to Jonas on YouTube! https://www.youtube.com/channel/UC_p_9arduPuxM8DHTGIuSOg')
    else if (args == 'itch' || args == 'itchio') message.channel.send('Follow and play Jonas\'s games on Itch! https://jonas-tyroller.itch.io/')
}