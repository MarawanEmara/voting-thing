require("dotenv").config();
const mongoose = require("mongoose");
const noblox = require("noblox.js");
const { EmbedBuilder } = require("discord.js");
const verifiedUsers = require("../../schemas/verified-users");

module.exports = (client) => {
  client.checkUser = async (interaction, userID) => {
    const bot = await noblox.setCookie(process.env.ROBLOSECURITY_TOKEN);
    const filter = (m) => m.author.id === interaction.user.id;
    verifiedUsers.countDocuments({ discordID: userID }, (err, count) => {
      if (count > 0) {
        interaction.reply({
          embeds: [
            acceptEmbed(
              "You are already verified. If you think this is a mistake, please contact the Electoral Commission."
            ),
          ],
        });
      } else {
        interaction
          .reply({
            embeds: [
              denyEmbed(
                "You are not verified. Please enter your Roblox Username."
              ),
            ],
          })
          .then(() => {
            interaction.channel
              .awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
              .then((message) => {
                const username = message.first().content;
                noblox
                  .getIdFromUsername(username)
                  .then(async (robloxID) => {
                    newUser = await new verifiedUsers({
                      _id: mongoose.Types.ObjectId(),
                      discordID: userID,
                      robloxID: robloxID,
                    });
                    await newUser.save().catch((err) => console.log(err));
                    interaction.followUp({
                      embeds: [acceptEmbed("You have been verified.")],
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    interaction.followUp({
                      content: `An error has occured while verifying account with username ${username}.`,
                    });
                    interaction.followUp({
                      embeds: [
                        denyEmbed(
                          "The username you entered was invalid. Please try again."
                        ),
                      ],
                    });
                  });
              })
              .catch((collected) => {
                interaction.followUp({
                  embeds: [
                    denyEmbed(
                      "You did not enter your Roblox Username in time."
                    ),
                  ],
                });
              });
          });
      }
    });

    function denyEmbed(message) {
      return new EmbedBuilder()
        .setColor("#ED4245")
        .setTitle("Verification")
        .setAuthor({
          name: "Electoral Commission",
          iconURL:
            "https://media-exp1.licdn.com/dms/image/C560BAQEMpZZewXBuJg/company-logo_200_200/0/1531742819850?e=2147483647&v=beta&t=Njb7Jy5UNynPABBaceLL6x3ymTY3civGml0wJdPclhk",
          url: "https://discord.gg/DDdvEbR",
        })
        .setDescription(message)
        .setTimestamp(Date.now())
        .setFooter({
          text: "Electoral Commission",
          iconURL:
            "https://media-exp1.licdn.com/dms/image/C560BAQEMpZZewXBuJg/company-logo_200_200/0/1531742819850?e=2147483647&v=beta&t=Njb7Jy5UNynPABBaceLL6x3ymTY3civGml0wJdPclhk",
        });
    }

    function acceptEmbed(message) {
      return new EmbedBuilder()
        .setColor("#57F287")
        .setTitle("Verification")
        .setAuthor({
          name: "Electoral Commission",
          iconURL:
            "https://media-exp1.licdn.com/dms/image/C560BAQEMpZZewXBuJg/company-logo_200_200/0/1531742819850?e=2147483647&v=beta&t=Njb7Jy5UNynPABBaceLL6x3ymTY3civGml0wJdPclhk",
          url: "https://discord.gg/DDdvEbR",
        })
        .setDescription(message)
        .setTimestamp(Date.now())
        .setFooter({
          text: "Electoral Commission",
          iconURL:
            "https://media-exp1.licdn.com/dms/image/C560BAQEMpZZewXBuJg/company-logo_200_200/0/1531742819850?e=2147483647&v=beta&t=Njb7Jy5UNynPABBaceLL6x3ymTY3civGml0wJdPclhk",
        });
    }
  };
};
