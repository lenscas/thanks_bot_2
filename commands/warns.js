const Discord  = require('discord.js')



module.exports.config = { 
    name: "warns",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first()

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;
    message.channel.send(`That user currently has ${warnings} warnings.`)
}