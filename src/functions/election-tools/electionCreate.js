require("dotenv").config();
const mongoose = require("mongoose");
const noblox = require("noblox.js");
const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  SelectMenuBuilder,
} = require("discord.js");
const elections = require("../../schemas/elections");

module.exports = (client) => {
  client.createElection = async (interaction) => {
    const modal = new ModalBuilder()
      .setCustomId("election-create")
      .setTitle("Create Election");

    const electionNameInput = new TextInputBuilder()
      .setCustomId("election-name")
      .setPlaceholder("What is the name of the election?")
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setMinLength(1)
      .setMaxLength(100)
      .setLabel("Election Name");

    const electionGroupIDInput = new TextInputBuilder()
      .setCustomId("election-group-id")
      .setPlaceholder("What is the ID for which this election is for?")
      .setLabel("Group ID")
      .setRequired(true)
      .setMinLength(1)
      .setMaxLength(100)
      .setStyle(TextInputStyle.Short);

    const electionRankIDInput = new TextInputBuilder()
      .setCustomId("election-rank-id")
      .setPlaceholder("What is the minimum rank ID of the rank that can vote?")
      .setStyle(TextInputStyle.Short)
      .setLabel("Rank ID")
      .setRequired(true)
      .setMinLength(1)
      .setMaxLength(3);

    const electionTimeInput = new TextInputBuilder()
      .setCustomId("election-time")
      .setPlaceholder("How long should the election last for in hours?")
      .setStyle(TextInputStyle.Short)
      .setLabel("Election Length")
      .setRequired(true)
      .setMinLength(1)
      .setMaxLength(2);

    /* const electionTimeInput = new SelectMenuBuilder()
      .setCustomId("election-time")
      .setPlaceholder("How long should the election last?")
      .addOptions(
        {
          label: "12 hours",
          value: "12",
          description: "12 hours",
        },
        {
          label: "24 hours",
          value: "24",
          description: "24 hours",
        },
        {
          label: "36 hours",
          value: "36",
          description: "36 hours",
        },
        {
          label: "48 hours",
          value: "48",
          description: "48 hours",
        }
      )
      .setRequired(true)
      .setLabel("Election Length"); */

    const numberOfPartiesInput = new TextInputBuilder()
      .setCustomId("number-of-parties")
      .setPlaceholder("How many parties are there?")
      .setStyle(TextInputStyle.Short)
      .setLabel("Number of Parties")
      .setRequired(true)
      .setMinLength(1)
      .setMaxLength(2);

    const electionNameRow = new ActionRowBuilder().addComponents(
      electionNameInput
    );
    const electionGroupIDRow = new ActionRowBuilder().addComponents(
      electionGroupIDInput
    );
    const electionRankIDRow = new ActionRowBuilder().addComponents(
      electionRankIDInput
    );
    const electionTimeRow = new ActionRowBuilder().addComponents(
      electionTimeInput
    );
    const numberOfPartiesRow = new ActionRowBuilder().addComponents(
      numberOfPartiesInput
    );

    modal.addComponents(
      electionNameRow,
      electionGroupIDRow,
      electionRankIDRow,
      electionTimeRow,
      numberOfPartiesRow
    );

    try {
      await interaction.showModal(modal);
    } catch (error) {
      interaction.reply({
        content:
          "There was an error while executing this command. Please try again later.",
        ephemeral: true,
      });
    }
  };
};
