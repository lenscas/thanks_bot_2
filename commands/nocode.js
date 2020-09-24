const Discord = require('discord.js')

module.exports.config = { 
    name: "nocode",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    message.channel.send('It\'s much easier for us to help you with your code, if you actually send it to us! Please always include your code if your problem is programming-related! To paste code, use a codeblock (if your unfamiliar on how to do this, simply type in !codeblock) If it\'s too long, type !pastemyst before it and I will automatically paste it for you! (source: https://idownvotedbecau.se/nocode)')
}