const { Client, Collection, MessageEmbed} = require('discord.js')
const request = require('superagent')

module.exports.config = { 
    name: "catfact",
    aliases: []
}

module.exports.run = async (client, message, args) => {
   request.get('https://catfact.ninja/fact').end((err, res) => {
      if (!err && res.status === 200) {
          message.channel.send(res.body.fact)
      } 
      else {
          console.log(`REST call failed: ${err}`);
      }
  });
}