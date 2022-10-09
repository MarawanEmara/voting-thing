require("dotenv").config();
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const botOwnerID = process.env.OWNER_ID;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("permissions")
    .setDescription("Set user permissions.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Adds a user to the bot permissions.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user to add.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Removes a user from the bot permissions.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user to remove.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("change")
        .setDescription("Changes a user's permissions.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user to change.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("permissions")
            .setDescription("The permissions to change.")
            .setRequired(true)
            .addChoice("Administrator", "Administrator")
            .addChoice("Election Manager", "Election Manager")
        )
        .addStringOption((option) =>
          option
            .setName("group")
            .setDescription("The group to add.")
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("list")
        .setDescription("Lists a certain user's permissions.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user to list.")
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "add") {
      if (interaction.user.id !== botOwnerID) {
        return interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
      }
    } else if (interaction.options.getSubcommand() === "remove") {
    } else if (interaction.options.getSubcommand() === "change") {
    } else if (interaction.options.getSubcommand() === "list") {
    }
  },
};