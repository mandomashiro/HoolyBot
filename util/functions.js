const mongoose = require("mongoose");
const { Guild } = require("../models/index");

module.exports = client => {
  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
    return client.config.defaultSettings;
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };

  client.createGuild = async settings => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, settings);
    const createGuild = await new Guild(merged);
    createGuild.save().then(g => console.log(`New guild -> ${g.guildName}.`));
  };
};
