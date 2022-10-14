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
        .addStringOption((option) =>
          option
            .setName("permission")
            .setDescription("The permission to add.")
            .setRequired(true)
            .addChoices(
              {
                name: "Administrator",
                value: "admin",
              },
              {
                name: "Election Manager",
                value: "manager",
              }
            )
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
        .addStringOption((option) =>
          option
            .setName("permission")
            .setDescription("The permission to remove.")
            .setRequired(false)
            .addChoices(
              {
                name: "Administrator",
                value: "admin",
              },
              {
                name: "Election Manager",
                value: "manager",
              }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("group")
        .setDescription("Changes a user's groups.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user whose groups to change.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("option")
            .setDescription("Choose between adding or removing a group.")
            .setRequired(true)
            .addChoices(
              {
                name: "Add",
                value: "add",
              },
              {
                name: "Remove",
                value: "remove",
              }
            )
        )
        .addStringOption((option) =>
          option
            .setName("group")
            .setDescription("The group ID to add or remove permissions for.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("list")
        .setDescription("Lists a certain user's permissions.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user whose permissions to list.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("option")
            .setDescription(
              "Choose between listing permissions or just groups."
            )
            .setRequired(true)
            .addChoices(
              {
                name: "Permissions",
                value: "perms",
              },
              {
                name: "Groups",
                value: "groups",
              }
            )
        )
    ),
  async execute(interaction, client) {
    const isAdmin = await client.userHasAdmin(interaction.user).catch((err) => {
      console.error(err);
      return false;
    });
    const hasPerms = await client
      .userHasPerms(interaction.user)
      .catch((err) => {
        console.error(err);
        return false;
      });
    if (interaction.options.getSubcommand() === "add") {
      if (!isAdmin) {
        await interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
      } else {
        const user = interaction.options.getUser("user");
        const permission = interaction.options.getString("permission");
        client.addUser(interaction, user, permission);
      }
    } else if (interaction.options.getSubcommand() === "remove") {
      if (!isAdmin) {
        await interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
      } else {
        const user = interaction.options.getUser("user");
        const permission = interaction.options.getString("permission");
        client.removeUser(interaction, user, permission);
      }
    } else if (interaction.options.getSubcommand() === "group") {
      if (!isAdmin) {
        await interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
      } else {
        const option = interaction.options.getString("option");
        if (option == "add") {
          const user = interaction.options.getUser("user");
          const group = interaction.options.getString("group");
          client.addGroup(interaction, user, group);
        } else if (option == "remove") {
          const user = interaction.options.getUser("user");
          const group = interaction.options.getString("group");
          client.removeGroup(interaction, user, group);
        }
      }
    } else if (interaction.options.getSubcommand() === "list") {
      if (!hasPerms) {
        await interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
      } else {
        const user = interaction.options.getUser("user");
        const option = interaction.options.getString("option");
        if (option == "perms") {
          client.listPerms(interaction, user);
        } else if (option == "groups") {
          client.listGroups(interaction, user);
        }
      }
    }
  },
};
