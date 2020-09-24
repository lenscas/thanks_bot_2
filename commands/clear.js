const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "clear",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('Permission denied!')

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) return message.reply('Please enter a valid number!')

    
    if (message.mentions.user) {
        let deleteAmountUser;

        if (parseInt(args[0]) > 100) deleteAmountUser = 100;
        else deleteAmountUser = parseInt(args[0])
        
        user.message.channel.bulkDelete(deleteAmountUser)
    }
    else {
        let deleteAmount;

        if (parseInt(args[0]) > 100) deleteAmount = 100;
        else deleteAmount = parseInt(args[0]);
    
        message.channel.bulkDelete(deleteAmount, true)
    }
}