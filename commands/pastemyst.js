const { Client, Collection, MessageEmbed} = require('discord.js')
const pastemyst = require('pastemyst-js')

module.exports.config = { 
    name: "pastemyst",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send('Please provide the code you\'d like me to paste!')
    else {
       pastemyst.createPasteMyst(args.join(' '), 'never', 'autodetect')
         .then((pasteMystInfo) => {
            message.channel.send(`Codeblock pasted by ${message.author}! - ${pasteMystInfo.link}`);
            message.delete()
         })
    }
}