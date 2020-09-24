const Discord = require('discord.js')

module.exports.config = { 
    name: "custompoll",
    aliases: []
}

module.exports.run = async (client, message, args) => {
	const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'CrazyJonas');
    let msgArgs = args.join(' ')

    if (!args[0]) return message.channel.send('Please tell me what you would like the poll to ask!')
    else {
        message.channel.send(`**${msgArgs}**`).then(messageReaction => {messageReaction.react(reactionEmoji.id)})
        message.delete();
    }
}