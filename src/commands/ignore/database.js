const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require("../../schemas/guild");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("Returns information from the database.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    let guildProfile = await Guild.findOne({ guildID: interaction.guild.id });
    if (!guildProfile) {
      guildProfile = await new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcon: interaction.guild.iconURL()
          ? interaction.guild.iconURL()
          : null,
      });

      await guildProfile.save().catch((err) => console.log(err));
      await interaction.reply({
        content: `Saved ${guildProfile.guildName} to the database.`,
      });
      console.log(guildProfile);
    } else {
      await interaction.reply({
        content: `Server name is ${guildProfile.guildName}.`,
      });
      console.log(guildProfile);
    }
  },
};
