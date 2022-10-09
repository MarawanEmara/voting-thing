require("dotenv").config();
const mongoose = require("mongoose");
const noblox = require("noblox.js");
const { EmbedBuilder } = require("discord.js");
const verifiedUsers = require("../../schemas/verified-users");

module.exports = (client) => {
  client.removeUser = async (interaction, user, permission) => {
    // Check if the user is in the database and has the permission
    verifiedUsers.countDocuments({ discordID: user.id }, async (err, count) => {
      if (interaction.user.id == user.id) {
        interaction.reply({
          content: "You cannot remove permissions from yourself.",
          ephemeral: true,
        });
      } else if (permission == "admin" && interaction.user.id !== botOwnerID) {
        interaction.reply({
          content: "You do not have permission to do that.",
          ephemeral: true,
        });
      }
    });
  };
};
