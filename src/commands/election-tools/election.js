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
    if (interaction.options.getSubcommand() === "create") {
      await client.createElection(interaction);
    } else if (interaction.options.getSubcommand() === "delete") {
      await client.deleteElection(interaction);
    } else {
      await interaction.reply({
        content: "Invalid command.",
        ephemeral: true,
      });
    }
  },
};
