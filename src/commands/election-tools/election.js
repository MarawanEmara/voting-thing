const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("election")
    .setDescription("Everything to do with elections.")
    .addSubcommand((subcommand) =>
      subcommand.setName("create").setDescription("Creates an election.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("delete").setDescription("Deletes an election.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("edit").setDescription("Edits an election.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("list").setDescription("Lists all elections.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("audit").setDescription("Audits an election.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("stop").setDescription("Stops in an election.")
    ),
  async execute(interaction, client) {
    if (interaction.user.id != process.env.OWNER_ID) {
    } else if (interaction.options.getSubcommand() === "create") {
      const initial = await client.createElection(interaction);
      console.log(initial);
    } else if (interaction.options.getSubcommand() === "delete") {
      await client.deleteElection(interaction);
    } else if (interaction.options.getSubcommand() === "edit") {
      await client.editElection(interaction);
    } else if (interaction.options.getSubcommand() === "list") {
      await client.listElections(interaction);
    } else if (interaction.options.getSubcommand() === "audit") {
      await client.auditElection(interaction);
    } else if (interaction.options.getSubcommand() === "stop") {
      await client.stopElection(interaction);
    } else {
      await interaction.reply({
        content: "Invalid command.",
        ephemeral: true,
      });
    }
  },
};
