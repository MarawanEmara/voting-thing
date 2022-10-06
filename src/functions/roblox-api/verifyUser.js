require("dotenv").config();
const mongoose = require("mongoose");
const noblox = require("noblox.js");
const { EmbedBuilder } = require("discord.js");
const verifiedUsers = require("../../schemas/verified-users");
const Sentencer = require("sentencer");

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
                    try {
                      pass = await generateSentence(
                        3 + Math.floor(Math.random() * 10)
                      );
                      // Prompt the user with an embed that says to change their description to the pass
                      interaction
                        .followUp({
                          embeds: [
                            utilsEmbed(
                              `Please change your Roblox description to \`${pass}\`.`
                            ),
                          ],
                        })
                        .then(() => {
                          // Wait 300 seconds for the user to change their description or until they cancel or respond with done
                          interaction.channel
                            .awaitMessages(
                              {
                                filter,
                                max: 1,
                                time: 300000,
                                errors: ["time"],
                              },
                              {
                                prompt:
                                  "Please change your Roblox description to the pass.",
                              }
                            )
                            .then((message) => {
                              if (message.first().content === "done") {
                                noblox.getBlurb(robloxID).then((blurb) => {
                                  if (blurb === pass) {
                                    const verifiedUser = new verifiedUsers({
                                      _id: mongoose.Types.ObjectId(),
                                      discordID: userID,
                                      robloxID: robloxID,
                                    });
                                    verifiedUser
                                      .save()
                                      .then((result) => {
                                        console.log(result);
                                      })
                                      .catch((err) => console.error(err));
                                    interaction.followUp({
                                      embeds: [
                                        acceptEmbed(
                                          "You have been verified. Welcome to the server!"
                                        ),
                                      ],
                                    });
                                  } else {
                                    interaction.followUp({
                                      embeds: [
                                        denyEmbed(
                                          "You did not change your description to the pass."
                                        ),
                                      ],
                                    });
                                  }
                                });
                              } else {
                                interaction.followUp({
                                  embeds: [
                                    denyEmbed(
                                      "You did not change your description to the pass."
                                    ),
                                  ],
                                });
                              }
                            });
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    } catch (error) {}
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

    function utilsEmbed(message) {
      return new EmbedBuilder()
        .setColor("#3498DB")
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
      return sentence;
    }
  };
};
