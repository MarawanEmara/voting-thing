require("dotenv").config();
const mongoose = require("mongoose");
const noblox = require("noblox.js");
const { EmbedBuilder } = require("discord.js");
const verifiedUsers = require("../../schemas/verified-users");
const Sentencer = require("sentencer");

module.exports = (client) => {
  client.verifyUser = async (interaction, userID) => {
    verifiedUsers.countDocuments({ discordID: userID }, async (err, count) => {
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
            interaction.deferReply();
          })
          .catch((err) => {
            interaction.reply({
              content:
                "You are already verified. I have attempted to DM you that, but could not.",
              ephemeral: true,
            });
          });
      } else {
        const filter = (m) => m.author.id === interaction.user.id;

        try {
          const embed = new EmbedBuilder()
            .setTitle("User Verification")
            .setDescription("What is your current Roblox username?")
            .setColor("#57F287");
          dm = await interaction.user.createDM();
          await interaction.deferReply();
          await dm.send({ embeds: [embed] });
        } catch (error) {
          await interaction.reply({
            content:
              "I could not DM you. Please enable DMs from server members.",
            ephemeral: true,
          });
          return;
        }

        let username;

        try {
          username = await getUsername(dm, filter);
        } catch (error) {
          const embed = new EmbedBuilder()
            .setTitle("User Verification")
            .setDescription(
              "You did not respond in time. Please try again later."
            )
            .setColor("#57F287");
          dm.send({ embeds: [embed] });
          return;
        }

        let robloxID;

        try {
          robloxID = await noblox.getIdFromUsername(username);
        } catch (error) {
          const embed = new EmbedBuilder()
            .setTitle("User Verification")
            .setDescription("That username does not exist. Please try again.")
            .setColor("#57F287");
          dm.send({ embeds: [embed] });
          username = await getUsername(dm, filter);
          try {
            robloxID = await noblox.getIdFromUsername(username);
          } catch (error) {
            const embed = new EmbedBuilder()
              .setTitle("User Verification")
              .setDescription(
                "That username does not exist. Please try again later."
              )
              .setColor("#57F287");
            dm.send({ embeds: [embed] });
            return;
          }
        }

        const verificationString = generateSentence(
          Math.floor(Math.random() * 5) + 3
        );
        try {
          const embed = new EmbedBuilder()
            .setTitle("User Verification")
            .setDescription(
              `Please include the following in your Roblox description: \`${verificationString}\`.`
            )
            .setColor("#57F287");
          dm.send({ embeds: [embed] });
        } catch (error) {
          await interaction.reply({
            content:
              "I could not DM you. Please enable DMs from server members.",
            ephemeral: true,
          });
          return;
        }

        let awaitVerification;

        try {
          awaitVerification = await beginVerification(interaction, dm);
        } catch (error) {
          const embed = new EmbedBuilder()
            .setTitle("User Verification")
            .setDescription(
              "You did not respond in time. Please try again later."
            )
            .setColor("#57F287");
          dm.send({ embeds: [embed] });
          return;
        }

        if (awaitVerification.first().content !== verificationString) {
          const embed = new EmbedBuilder()
            .setTitle("User Verification")
            .setDescription(
              "You did not include the correct verification string. Please try again."
            )
            .setColor("#57F287");
          dm.send({ embeds: [embed] });
          try {
            awaitVerification = await beginVerification(interaction, dm);
          } catch (error) {
            const embed = new EmbedBuilder()
              .setTitle("User Verification")
              .setDescription(
                "You did not respond in time. Please try again later."
              )
              .setColor("#57F287");
            dm.send({ embeds: [embed] });
            return;
          }
        }

        if (awaitVerification.first().content !== verificationString) {
          const embed = new EmbedBuilder()
            .setTitle("User Verification")
            .setDescription(
              "You did not include the correct verification string. Please try again later."
            )
            .setColor("#57F287");
          dm.send({ embeds: [embed] });
          return;
        }

        // Add user to database
        const newUser = new verifiedUsers({
          _id: mongoose.Types.ObjectId(),
          discordID: userID,
          robloxID: robloxID,
          robloxUsername: username,
        });

        newUser.save().catch((err) => {
          console.log(err);
          const embed = new EmbedBuilder()
            .setTitle("User Verification")
            .setDescription(
              "There was an error saving your data. Please try again later."
            )
            .setColor("#57F287");
          dm.send({ embeds: [embed] });
          return;
        });

        const embed = new EmbedBuilder()
          .setTitle("User Verification")
          .setDescription("You have been successfully verified.")
          .setColor("#57F287");
        dm.send({ embeds: [embed] }).catch((err) => {
          interaction.reply({
            content:
              "You have been successfully verified. I have attempted to DM you that, but could not.",
            ephemeral: true,
          });
        });
      }

      async function getUsername(dm, filter) {
        try {
          const awaitUsername = await dm.awaitMessages({
            filter,
            max: 1,
            time: 60000,
            errors: ["time"],
          });
          return awaitUsername.first().content;
        } catch (error) {
          throw error;
        }
      }

      async function beginVerification(interaction, dm) {
        try {
          filter = (m) =>
            m.author.id === interaction.user.id &&
            m.content.toLowerCase().includes("done");
          const awaitVerification = await dm.awaitMessages({
            filter,
            max: 1,
            time: 60000,
            errors: ["time"],
          });
          return awaitVerification;
        } catch (error) {
          throw error;
        }
      }

      function generateSentence(length) {
        possibilities = [
          "{{ an_adjective }}",
          "{{ a_noun }}",
          "{{ nouns }}",
          "{{ noun }}",
          "{{ adjective }}",
        ];
        sentence = "";
        if (length < 1) {
          return sentence;
        }
        for (i = 0; i < length; i++) {
          sentence +=
            possibilities[Math.floor(Math.random() * possibilities.length)];
        }
        sentence = Sentencer.make(sentence);
        return "dncmark";
      }
    });
  };
};
