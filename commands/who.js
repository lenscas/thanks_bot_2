const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "who",
    aliases: ['ball', '8b']
}

module.exports.run = async (client, message, args) => {
   if(!args[0]) message.reply('Please ask me a question.');

    else {
      let eightball = [
      'Jonas.',
      'Yän',
      'Gandhi',
      'Your cousin.',
      'Your cousin\'s uncle\'s neighbour\'s grandfather\'s cat\'s doll',
      'Kim.',
      'Brackeys.',
      'Bill Gates.',
      'Your mom.',
      'Your dad.',
      'You.',
      'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr.',
      'Daddy.',
      'Squid.',
      'The senate members of Tuvalu.',
      'Rhoshandiatellyneshiaunneveshenk Koyaanisquatsiuth Williams',
      'Shelly.',
      'Not you.',
      'Juan Joya Borja',
      'Jonas\'s teddy bear.',
      'Me.',
      'Steven Jobbers.',
      'My imaginary friend',
      'Your imaginary friend.',
      'Your best friend',
      'The people who can spell pneumonoultramicroscopicsilicovolcanoconiosis correctly.',
      'Bustin Jieber.',
      'A game developer.',
      'Issac Newton',
      ];
      let index = (Math.floor(Math.random() * Math.floor(eightball.length)));
      message.channel.send(eightball[index]);
   }
}