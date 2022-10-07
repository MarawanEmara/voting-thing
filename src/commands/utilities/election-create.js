const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("election")
    .setDescription("Everything to do with elections.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR)
    .addSubcommand((subcommand) =>
      subcommand.setName("create").setDescription("Creates an election.")
    ),
  async execute(interaction, client) {
    
  },
};
