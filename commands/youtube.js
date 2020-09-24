const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "youtube",
    aliases: ['ball', '8b']
}

module.exports.run = async (client, message, args) => {
   if(!args[0]) message.reply('Please tell me what you would like to search.');
   else {
       let search = args.join('+');

       message.channel.send(`<https://www.youtube.com/results?search_query=${search}>`)
   }
}