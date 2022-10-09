const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Submits a vote for the current election.")
    .setDMPermission(true),
  async execute(interaction, client) {
    const user = await interaction.user;
    client.vote(interaction, user.id);
  },
};
