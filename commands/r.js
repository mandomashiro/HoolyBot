module.exports = (client, message, args) => {
  message.channel.send(args.join(" "));
  message.delete({ timeout: 0 }).then(console.log("Un message a été supprimé"));
};
