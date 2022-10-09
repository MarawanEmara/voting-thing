const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verifies the user's identity."),
  async execute(interaction, client) {
    const user = await interaction.user;
    client.verifyUser(interaction, user.id);
  },
};
