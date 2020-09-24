# spamnya
a spam detector for discord.js bots
---
# Usage
```javascript
  const Discord = require('discord.js')
  const spam = require('spamnya')
  let client = new Discord.Client()

  client.on('message', (message) => {
    //initiate the detector and log the chats with max 50 logged chats
    spam.log(message, 50)

    if(spam.tooQuick(3, 1000)){
      // when someone send 3 chats in less than a second
    }

    if(spam.sameMessages(3, 60000)){
      // when someone send 3 identical chats within a minute
    }
  })

```
