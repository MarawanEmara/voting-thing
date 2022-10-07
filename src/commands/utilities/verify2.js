const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify2")
    .setDescription("Verifies the user's identity."),
  async execute(interaction, client) {
    const user = await interaction.user;
    client.checkUser2(interaction, user.id);
  },
};
