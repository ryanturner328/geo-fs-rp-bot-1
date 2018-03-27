exports.run = function(msg, args, Discord, client){
  const config = require('../lib/basics.js'),
  commandlib = config.cmd,
  owner = config.idOwners.find(id => id == msg.author.id),
  cmd = commandlib.filter(cmd => cmd.aviliable == true);
  // Temporal method
  const cmdMap = cmd.map(cmd => cmd.name);
  const descriptions = cmd.map(cmd => cmd.descript);
  // ---------------
  const embed = new Discord.RichEmbed()
  .setColor(0xADD8E6)
  .setTitle("Bot is down for a little for Maintenance.")
  for(let i = 0, b = cmdMap.length; i<b ;i++){
    embed.addField(cmdMap[i], descriptions[i]);
  }
  msg.channel.send({ embed });
}