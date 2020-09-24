const { Client, Collection, MessageEmbed} = require('discord.js')

module.exports.config = { 
    name: "questions",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    message.channel.send(`**We want to help you with your issue, so help us help you.**
            
**__Before Asking__**
Make sure you have tried using google to find an answer to your question and let us know what you tried.
                
**__Asking Your Question__**
-Write in clean language, so that your question is easy to read.
-Tell us what tools/engine/etc you're using, we don't know if you're using Unity, UE4, godot, or your own custom tools.
-Send questions in accessible, standard forms.  (Cellphone pictures of your computer screen are hard to read at best)
                
__Code:__ please use a codeblock (!codeblock)
__Error messages:__ Screenshot or full verbatim
                
Explain both your indented outcome and what is actually happening.
Describe the symptoms, not your guesses.
Describe your goal, the problem might be somewhere other than where you think it is.
Courtesy never hurts and sometimes helps
                
**__After you get helped__**
If your issue is fixed, let everyone know that it is solved.`);
}