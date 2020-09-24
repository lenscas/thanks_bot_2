const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "rule",
    aliases: ['r', 'rules']
}

module.exports.run = async (client, message, args) => {
   if(!args[0]) message.reply('Specify a rule');

   if(args == '1') message.channel.send('Don\'t discuss religion or politics, except it\'s in the context of games. If you do, keep it extremely respectful.');
   else if (args == '2') message.channel.send('Don\'t post illegal, racist, sexist, homophobic or transphobic content.');
   else if (args == '3') message.channel.send('Keep it kind of PG-13, because we might have some younger people here. Show some responsibility for that.');
   else if (args == '4') message.channel.send('Please be nice and respectful to everybody.');
   else if (args == '5') message.channel.send('No spam. Links without ANY context will be removed as well.')
   else if (args == '6') message.channel.send('Mods have permission to ban you after one warning.');
   else if (args == '7') message.channel.send('Banning you for intentionally malicious behavior doesn\'t require a warning.')
   else if (args == '34') message.channel.send('Not on this server.');
   else if (args == '69') message.channel.send('Don\'t even try...');
   else if (args == '420') message.channel.send('I am still sane. Good thing I am not a human.');
}