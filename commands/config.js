/* eslint-disable indent */

exports.run = async (client, message, args, settings) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return undefined;

  const getSetting = args[0];
  const newSetting = args.slice(1).join(" ");

  switch (getSetting) {
    case "prefix": {
      if (newSetting) {
        await client.updateGuild(message.guild, { prefix: newSetting });
        return message.channel.send(`Prefix mis à jour: \`${settings.prefix}\` -> \`${newSetting}\``);
      }
      message.channel.send(`Prefix: \`${settings.prefix}\``);
      break;
    }
    case "welcomeChannel": {
      if (newSetting) {
        await client.updateGuild(message.guild, { welcomeChannel: newSetting });
        return message.channel.send(`WelcomeChannel mis à jour: \`${settings.welcomeChannel}\` -> \`${newSetting}\``);
      }
      message.channel.send(`WelcomeChannel: \`${settings.welcomeChannel}\``);
      break;
    }
  }
};

exports.help = {
  name: "config"
};
