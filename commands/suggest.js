const data = require('./json/trello.json')
const Trello = require('trello');
const trello = new Trello(data.applicationkey, data.usertoken)

const Discord = require('discord.js')

module.exports.config = { 
   name: "suggest",
   aliases: []
}

module.exports.run = async (client, message, args) => {
   const listId = data.listid

   if (!args[0]) return message.channel.send('Please tell me what you would like to suggest! (please don\'t spam my suggestions list with nonsense)')
   else { 
      trello.addCard(args.join(' '), '', listId)
      message.channel.send(`Thanks for your suggestion, ${message.author}! It has been added to the developer's Trello list. I request you to not suggest junk and/or spam. Thanks!`)
   }
}