'use stricts'
const Discord = require("discord.js");
const client = new Discord.Client();
const http = require('http');
const express = require('express');
const app = express();
const config = require('./lib/basics.js');
const aviliableCommands = config.cmd.filter(cmd => cmd.aviliable == true).map(cmd => cmd.name);
console.log("Aviliable commands: ", aviliableCommands)

setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

app.get("/", (request, response) => {
  response.status(404).send("<b>404 not found</b>");
})
app.listen(process.env.PORT)

//Client online event
client.on('ready',() => {
  console.log("Bot is Online, and Ready!")
     client.user.setPresence( {
       status: 'Online',
       game: {
           name: `Kinda Buggy, Be easy, Ready To Use.`,
           type: 'STEAMING'
       }
    });
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel
  if(oldUserChannel === undefined && newUserChannel !== undefined) {
     // User Joins a voice channel
  } else if(newUserChannel === undefined){
    // User leaves a voice channel
  }
})

client.on('message', msg => {
  let owner = config.idOwners.find(id => id == msg.author.id);
  if(config.idTester == msg.author.id) owner = true;
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return msg.channel.send('Please, use my commands in the server. Thanks!')
  if(!msg.content.startsWith(config.prefix)) return
  const contentArray = msg.content.toLowerCase().split(' ');
  const args = contentArray.slice(1);
  const userCommand = contentArray[0].slice(config.prefix.length);
  
  if (userCommand == "eval") {
      const limit = 1950;
      try {
          let code = args.join(' ');
          let evalued = eval(code);
          if (typeof evalued !== "string")
              evalued = require("util").inspect(evalued);
          let txt = "" + evalued;
          if (txt.length > limit) {
              msg.channel.send(`\`\`\`js\n ${txt.slice(0, limit)}\n\`\`\``);
          }
          else
              msg.channel.send(`\`\`\`js\n ${txt}\n\`\`\``);
      } catch (err) {
          msg.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
      }
      return
  }
  
  if(aviliableCommands.find(x => x == userCommand)){
      let needPerm = config.cmd.filter(cmd => cmd.name == userCommand)[0].admOnly;
      const lib = require("./cmd/"+userCommand+".js");
      if(!owner && needPerm) return msg.channel.send("You aren't the owner")
      lib.run(msg, args, Discord, client); 
    }
    else msg.channel.send("```undefined```");
});

client.login(process.env.TOKEN)
