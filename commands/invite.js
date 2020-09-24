const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "invite",
    aliases: ["inv", "invit"]
}

module.exports.run = async (client, message, args) => {
    if (args == 'mgt' || args == 'makinggamestogether' || args == 'jonas' || args == 'community' || args == 'main') message.channel.send('https://discord.gg/Ye6zzfQ')
    else if (args == 'wys' || args == 'willyousnail' || args == 'game') message.channel.send('https://discord.gg/G3mRDrK')
    else message.channel.send('Server name invalid (make sure it is a server owned by Jonas)')
}