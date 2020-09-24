const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "codeblock",
    aliases: ['cb', 'block']
}

module.exports.run = async (client, message, args) => {
    message.channel.send("**Use Codeblocks To Paste Your Code!** \n \n https://media.discordapp.net/attachments/428123194575159299/753697368993693856/unknown.png \n \n If the script is too large, consider using a service such as <https://paste.myst.rs/>");
}