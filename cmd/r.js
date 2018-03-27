exports.run = function(msg, args, Discord, client){
    if (!args) {
      msg.channel.send(`:x: | Provide a command name to reload.`);
      return;
    }
    delete require.cache[require.resolve(`./${args}.js`)];
    msg.channel.send(`The command \`${args}\` has been reloaded!`);
    //<a:update:416277556569047040>
}