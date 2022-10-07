require("dotenv").config();
const mongoose = require("mongoose");
const noblox = require("noblox.js");
const { EmbedBuilder } = require("discord.js");
const verifiedUsers = require("../../schemas/verified-users");
const Sentencer = require("sentencer");

module.exports = (client) => {
  client.checkUser2 = async (interaction, userID) => {
    const bot = await noblox.setCookie(process.env.ROBLOSECURITY_TOKEN);
    verifiedUsers.countDocuments({ discordID: userID }, (err, count) => {
      if (count > 0) {
        const embed = new EmbedBuilder()
          .setTitle("User Verification")
          .setDescription(
            "You are already verified. If you think this is a mistake, please contact the Electoral Commission."
          )
          .setColor("#57F287");
        interaction.user
          .createDM()
          .then((dm) => {
            dm.send({ embeds: [embed] });
          })
          .catch((err) => {
            interaction.reply({
              content:
                "You are already verified. I have attempted to DM you that, but could not.",
              ephemeral: true,
            });
          });
      } else {
        const embed = new EmbedBuilder()
          .setTitle("User Verification")
          .setDescription("What is your current Roblox username?")
          .setColor("#57F287");
        interaction.user
          .createDM()
          .then((dm) => {
            dm.send({ embeds: [embed] });
            const filter = (m) => m.author.id === interaction.user.id;
            dm.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
              .then((message) => {
                const username = message.first().content;
                try {
                } catch (err) {}
              })
              .catch((err) => {});
          })
          .catch((err) => {
            interaction.reply({
              content:
                "You are not verified. I have attempted to DM you that, but could not.",
              ephemeral: true,
            });
          });
      }
    });
  };
};
