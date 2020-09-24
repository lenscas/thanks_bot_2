const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "gameidea",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    let gameIdea = new MessageEmbed()
    .setColor('#00E4FF')
    .setTitle("**Out of Game Ideas?**")
    .setDescription("Here are a few links that will get your creative juices flowing 😉")
    .addField('Jonas Tyroller\'s Video On Game Ideas', 'https://www.youtube.com/watch?v=y2IAjXl5xRU')
    .addField('Blackthornprod\'s Video On Game Ideas', 'https://www.youtube.com/watch?v=RRu6mlaSdT0')
    .addField('Game Idea Generator', 'https://condescending-edison-85eeab.netlify.app/');
    
    message.channel.send(gameIdea)
}