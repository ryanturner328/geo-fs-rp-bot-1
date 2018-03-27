exports.run = function(msg, Discord, client, args){
        msg.channel.send("One Second Please.").then(() => {
            client.destroy().then(() => {
                process.exit()
            })
    });
  //<a:update:416277556569047040>
}
