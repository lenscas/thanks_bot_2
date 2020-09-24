const {Client, Collection, MessageEmbed, Message} = require('discord.js')

const pastemyst = require('pastemyst-js')

const client = new Client()

const botsettings = require(`./botsettings.json`)

const prefix = botsettings.prefix;

let cooldown = new Set()
let cdseconds = 5;

const fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        client.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name)
        });
    });
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "tests");

    if (!channel) return;

    member.send('Welcome to **Jonas Tyroller\'s** official Discord Server! We hope you have a great time here 😊')
    channel.send(`**Welcome to our Server!**, ${member}!, Make sure to read the <#428189176559828992>, grab some <#615268721199677480>, and feel free to introduce yourself to others here!`)
})

client.on('ready', () => {
    console.log('Bot is updated!')
    client.user.setActivity(`${client.users.cache.size} Zimple Men!`, {type: "WATCHING"})
})

client.on('message', async message => {
    if (!message.content.startsWith(prefix)) return
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(client,message,args)

    if (cooldown.has(message.author.id)) return
    
    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdseconds + 10000)
})

client.on('message', message => {

    if (message.content.length > 1000 && message.author.id != client.id) {
        pastemyst.createPasteMyst(message, 'never', 'autodetect')
        .then((pasteMystInfo) => {
           message.channel.send(`Codeblock pasted by ${message.author}! - ${pasteMystInfo.link}`);
           message.delete()
        })
    }

    if(message.content == 'prefix') message.reply(`My prefix is ${prefix}`)

    if (message.channel.type === 'dm') {
        
        if (message.content == 'no') message.author.send('yes.')
        
    }

    let blacklisted = ['nigger', 'nigga', 'faggot', 'fagget','fagot', 'faget', 'faggot']

    let foundInText = false;

    for (var i in blacklisted) { 
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }

    if (foundInText) {

        if (message.author.id != client.id) {
            message.delete();

            const blacklistedEmbed = new MessageEmbed()
            .setColor('#BF3737')
            .setTitle('Blacklisted word was detected!')
            .addField('**Message**', `${message.content}`)
            .addField('**Author**', `${message.author}`)
            .setTimestamp();

            message.channel.send(blacklistedEmbed);
        }
    }
})

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (!oldMessage.guild) return;

    const oldMessageMention = oldMessage.mentions.members.first()
    const newMessageMention = newMessage.mentions.members.first()

    if (oldMessageMention && !newMessageMention && oldMessage.author.id !== oldMessageMention.id) {
        let embed = new MessageEmbed()
            .setColor('#ff6a6a')
            .setTitle("Ghost ping detected!")
            .addField('**Author**', oldMessage.author)
            .addField("**Origional Message**", oldMessage, true)
            .addField("**New Message**", newMessage, true)
            .addField('**Type**', 'Sender sent a message. Then proceeded to edit the ping out of the message.')
            .setTimestamp();
        oldMessage.channel.send(embed)
    }
})

client.on('messageDelete', message => {
    if (!message.guild) return;

    if (message.mentions.members.first() && message.mentions.members.first().id != message.author.id) {
        let embed = new MessageEmbed()
            .setColor('#ff6a6a')
            .setTitle("Ghost ping detected!")
            .addField('**Sender**', message.author)
            .addField("**Message**", message.content)
            .addField('**Type**', 'Sender sent a message, and then proceeded to delete it thereafter.')
            .setTimestamp();
        message.channel.send(embed)
    }
})

client.login(botsettings.token)