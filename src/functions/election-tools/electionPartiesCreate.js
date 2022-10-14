require("dotenv").config();
const mongoose = require("mongoose");
const noblox = require("noblox.js");
const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const elections = require("../../schemas/elections");

module.exports = (client) => {
  client.createParties = async (interaction, numberOfParties, electionDB) => {
    const modal = new ModalBuilder()
      .setCustomId("party-create")
      .setTitle("Party Creation");

    for (let i = 0; i < numberOfParties; i++) {
      const partyNameInput = new TextInputBuilder()
        .setCustomId(`party-name-${i + 1}`)
        .setPlaceholder(`Party No. ${i + 1}'s Name`)
        .setLabel("What is the party's name?")
        .setStyle(TextInputStyle.Short)
        .setMinLength(3)
        .setMaxLength(100)
        .setRequired(true);

      const partyLeaderInput = new TextInputBuilder()
        .setCustomId(`party-leader-${i + 1}`)
        .setPlaceholder(`Who is the party's leader?`)
        .setLabel(`Party No. ${i + 1}'s Leader`)
        .setStyle(TextInputStyle.Short)
        .setMinLength(3)
        .setMaxLength(100)
        .setRequired(true);

      const partyManifestoInput = new TextInputBuilder()
        .setCustomId(`party-manifesto-${i + 1}`)
        .setPlaceholder(`Party No. ${i + 1}'s Manifesto`)
        .setLabel("Link to or description of the party manifesto")
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(1)
        .setMaxLength(1000)
        .setRequired(true);

      const partyNameRow = new ActionRowBuilder().addComponents(partyNameInput);

      const partyLeaderRow = new ActionRowBuilder().addComponents(
        partyLeaderInput
      );

      const partyManifestoRow = new ActionRowBuilder().addComponents(
        partyManifestoInput
      );

      modal.addComponents(partyNameRow, partyLeaderRow, partyManifestoRow);
    }

    try {
      await interaction.showModal(modal);
    } catch (error) {
      interaction.reply({
        content:
          "There was an error while executing this command. Please try again later.",
        ephemeral: true,
      });
      console.log(error);
    }
  };
};
