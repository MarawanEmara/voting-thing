require("dotenv").config();
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const botOwnerID = process.env.OWNER_ID;
const userPermissionsDB = require("../../schemas/user-permissions");

// Returns a list of the user's permissions.
checkUserPerms = (user) => {
  userPermissionsDB.countDocuments({ discordID: user.id }, (err, count) => {
    if (count == 0) {
      return null;
    } else {
      userPermissionsDB.findOne({ discordID: user.id }, (err, data) => {
        if (data) {
          return data.userPermissions;
        }
      });
    }
  });
};

// Checks if a user has the admin permission.
checkAdmin = (user) => {
  userPermissionsDB.countDocuments(
    { discordID: user.id, userPermissions: { $in: "admin" } },
    (err, count) => {
      if (count == 0) {
        return false;
      } else {
        return true;
      }
    }
  );
};

// Checks if a user has any permissions.
checkUser = (user) => {
  userPermissionsDB.countDocuments({ discordID: user.id }, (err, count) => {
    if (count == 0) {
      return false;
    } else {
      return true;
    }
  });
};

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
            .setName("group")
            .setDescription("The group to add permissions for.")
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
            .setDescription("The user whoe permissions to list.")
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    const isAdmin = checkAdmin(interaction.user);
    const hasPerms = checkUser(interaction.user);
    if (interaction.options.getSubcommand() === "add") {
      if (!(interaction.user.id == botOwnerID || isAdmin)) {
        return interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
      } else {
        const user = interaction.options.getUser("user");
        const permission = interaction.options.getString("permission");
        client.addUser(interaction, user, permission);
      }
    } else if (interaction.options.getSubcommand() === "remove") {
      if (!(interaction.user.id == botOwnerID || isAdmin)) {
        return interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
      } else {
        const user = interaction.options.getUser("user");
        const permission = interaction.options.getString("permission");
        client.removeUser(interaction, user, permission);
      }
    } else if (interaction.options.getSubcommand() === "change") {
      if (!(interaction.user.id == botOwnerID || isAdmin)) {
        return interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
      } else {
        const user = interaction.options.getUser("user");
        const group = interaction.options.getString("group");
        client.changeUser(interaction, user, group);
      }
    } else if (interaction.options.getSubcommand() === "list") {
      if (!(interaction.user.id == botOwnerID || hasPerms)) {
        return interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
      } else {
        const user = interaction.options.getUser("user");
        client.listUser(interaction, user);
      }
    }
  },
};
