exports.run = function(msg, args, Discord, client){
      let ping = Math.floor(msg.client.ping);
      msg.channel.send(":ping_pong: Pong!")
      .then(m => {
        const embed = new Discord.RichEmbed()
        .setDescription(`:envelope_with_arrow: Ping Messages: \`${m.createdTimestamp - msg.createdTimestamp} ms\`\n:globe_with_meridians: Ping DiscordAPI: \`${ping} ms\``)
        .setColor(0x00AE86)   
         m.edit({embed});
      });
}