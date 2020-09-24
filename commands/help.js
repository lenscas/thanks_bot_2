const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "help",
    aliases: ['commands', 'cmds']
}

module.exports.run = async (client, message, args) => {
    if (!args[0]) {
        const helpEmbed = new MessageEmbed()
        .setTitle("Help")
        .setDescription("To see more commands please use the commands you can see below!")
        .addField('**Admins**', '`!help admin`')
        .addField('**Users**', '`!help user`')
        .addField('**Features**', '`!help features`')
        message.channel.send(helpEmbed)
    }
    else {
        switch(args[0]) {
            case 'user':
                const userHelp = new MessageEmbed()
                .setTitle('User Help')
                .setDescription('You can learn more about a command using `!commandinfo <commandname>`')
                .addField('**Prediction**', '`!8ball` | `!who` | `!when` | `!where`')
                .addField('**Fun**', '`!joke` | `!norisjoke` | `!warm` | `!bam` | `!dogfact` | `!catfact` | `!coinflip` | `!diceroll` | `!f` | `!weather` | `!covid` | `!translate` | `!hicount` | `!poll` | `!custompoll`')
                .addField('**Coding**', '`!ask` | `!nocode` | `!learncode` | `!codeblock` | `!pastemyst` | `!google` | `!search` | `!youtube` | `!lmgtfy` | `!gameidea`')
                .addField('**Bot**', '`!github` | `!contribute` | `!botinfo` | `!bug` | `!suggest` | `!ping` | `!trello`')
                .addField('**Jonas**', '`!social` | `!invite`')
                .addField('**User and Server**', '`!avatar` | `!userinfo` | `!channelinfo`')
                .addField('**Other**', '`!report` | `!rule`')
                .addField('**Art Jam**', '`!artthemesuggest` | `!artjamfiles` | `!artjam`')
                .addField('**Music Jam**', '`!musicthemesuggest` | `!musicjamfiles` | `!musicjam`')
                message.channel.send(userHelp);
            break;

            case 'admin':
                const adminHelp = new MessageEmbed()
                .setTitle('Admin Help')
                .setDescription('You can learn more about each command using `!commandinfo <commandname>`')
                .addField('**Moderation**', '`!mute` | `!warn` | `!clear`')
                .addField('**Art Jam**', '`!addart` | `!artthemes`')
                .addField('**Music Jam**', '`!addsong` | `!musicthemes`')
                message.channel.send(adminHelp)
            break;

            case 'features':
                const featureEmbed = new MessageEmbed()
                .setTitle('Features of this bot')
                .addField('**Anti-Spam Protection**', 'When a user sends 3 messages in less than one second, the bot detects possible spam')
                .addField('**Ghost Ping Logging**', 'This bot detects and logs all ghost pings.')
                .addField('**Full art and music jam support**', 'This bot automates as much of the jams as possible.')
                .addField('**Over 100 commands**', 'This bot features over 100 commands, for fun, moderation, coding, and a easier and better user experience.')
                .setFooter('To give feedback and suggestion, simply do !suggest')
                message.channel.send(featureEmbed);
        }
    }
}