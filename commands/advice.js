const { Client, Collection, MessageEmbed} = require('discord.js')
const request = require('superagent');

module.exports.config = { 
    name: "advice",
    aliases: ['lifeadvice', 'advise', 'lifeadvise']
}

module.exports.run = async (client, message, args) => {
   request
   .get('http://api.adviceslip.com/advice')
   .end((err, res) => {
       if (!err && res.status === 200) {
           try {
               JSON.parse(res.text)
           } catch (e) {
               return message.reply(', an api error occurred.');
           }
           const advice = JSON.parse(res.text)
           message.channel.send(advice.slip.advice)
       } else {
       console.error(`REST call failed: ${err}, status code: ${res.status}`)
       }
   });
}