const { Client, Collection } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableEveryone: true });
const fs = require("fs");

client.PREFIX = PREFIX;
require("./util/functions")(client);
client.mongoose = require("./util/mongoose");
client.commands = new Collection();

// ----------------------------------------------
client.commands.set("r", require("./commands/r.js"));
client.commands.set("sinfo", require("./commands/sinfo.js"));
client.commands.set("match", require("./commands/match.js"));
client.commands.set("animals", require("./commands/animals.js"));
client.commands.set("role", require("./commands/role.js"));
client.commands.set("eval", require("./commands/eval.js"));

client.on("message", msg => require("./events/message.js")(client, msg));
client.on("guildCreate", guild => require(".events/guildCreate.js")(client, guild));
// -------------------------------------------------

fs.readdir("./events/", (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const evt = require(`./events/${file}`);
    const evtName = file.split(".")[0];
    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});

fs.readdir("./commands/", async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const props = require(`./commands/${file}`);
    const cmdName = file.split(".")[0];
    console.log(`Loaded command '${cmdName}'`);
    client.commands.set(cmdName, props);
  });
});

client.mongoose.init();
client.login(TOKEN);
client.on("error", console.error);
client.on("warn", console.warn);
