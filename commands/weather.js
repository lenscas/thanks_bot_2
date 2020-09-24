const Discord = require('discord.js')
const weather = require('weather-js')

module.exports.config = { 
  name: "weather",
  aliases: []
}

module.exports.run = async (client, message, args) => {
  weather.find({search: args.join(" "), degreeType: 'C'}, function (err, result) {
    if (err) return message.channel.send('Error. Couldn\'t fetch weather for requested location');
    if (!args[0]) return message.channel.send('Please specify a location!');

    if(result == undefined || result.lenght === 0) return message.channel.send('Couldn\'t find the location you mentioned!');

    var current = result[0].current;
    var location = result[0].location;

    const weatherInfo = new Discord.MessageEmbed()
    .setColor('#41FF7D')
    .setDescription(`${current.skytext}`)
    .setAuthor(`Weather forcast for ${current.observationpoint}`)
    .setThumbnail(current.imageUrl)
    .addField('Timezone', `UTC${location.timezone}`, true)
    .addField('Degree Type', 'Celsius', true)
    .addField('Temperature', `${current.temperature}°`, true)
    .addField('Wind', current.winddisplay, true)
    .addField('Feels like', `${current.feelslike}°`, true)
    .addField('Humidity', `${current.humidity}%`, true);

    message.channel.send(weatherInfo);
  })
}