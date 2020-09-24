const Discord = require('discord.js')

module.exports.config = { 
    name: "report",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    if (!message.channel.type == 'dm') return message.channel.send('Please tell me what you would like to report in my DM, using !report.')
    else if (message.channel.type == 'dm') {
        let reason = args.join(' ')

        if (!reason) return message.author.send('Please tell me what you would like to report!')

        const reportEmbed = new Discord.MessageEmbed()
        .setColor('#ff6a6a')
        .setTitle('**New Report**')
        .addField('Report created by', `<@${message.author.id}>`)
        .addField('**Content**', `${reason}`)
        .setTimestamp()

        const channel = client.channels.cache.get('742510158269120597')

        if (!channel) return;

        message.author.send('Your report has been given to the moderators to check over. It is our humble request that you don\'t send nonsencial reports, Thanks!')
        channel.send(reportEmbed);
    }
}