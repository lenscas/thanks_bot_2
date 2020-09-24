const { Client, Collection, MessageEmbed} = require('discord.js')
const request = require('superagent')

module.exports.config = { 
    name: "dogfact",
    aliases: []
}

module.exports.run = async (client, message, args) => {
   request.get('https://dog-api.kinduff.com/api/facts').end((err, res) => {
      if (!err && res.status === 200) {
          message.channel.send(res.body.facts[0])
      } else {
          console.log(`REST call failed: ${err}`)
      }
  });
}