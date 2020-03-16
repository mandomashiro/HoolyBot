module.exports = async (client, message) => {
  const settings = await client.getGuild(message.guild);
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if (message.content === "Bonjour") message.channel.send("Coucou grosse bite !");
  if (message.content === "Coucou") message.channel.send("Wesh, la forme mec ?");
  if (message.content === "Wesh") message.channel.send("Wesh ma gueule !");
  if (message.content === "Salut") message.channel.send("Coucou !");
  if (message.content === "Yo") message.reply("Belle journée, hein !");

  if (message.content === "everyone") message.channel.send("@everyone, salut à tous !", { disableEveryone: false });
  if (message.content === "noteveryone") message.channel.send("@everyone (noteveryone), salut à tous !");
  if (message.author.bot) return;
  if (message.content.indexOf(settings.prefix) !== 0) return;

  const cmd = client.commands.get(command);
  if (!cmd) return undefined;
  cmd.run(client, message, args, settings);
};
