const electionDB = require("../../schemas/elections");
const mongoose = require("mongoose");
const { ModalBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "election-create",
  },
  async execute(interaction, client) {
    const electionNameInput =
      interaction.fields.getTextInputValue("election-name");

    var electionGroupIDInput =
      interaction.fields.getTextInputValue("election-group-id");
    try {
      electionGroupIDInput = parseInt(electionGroupIDInput);
      if (isNaN(electionGroupIDInput)) {
        throw new error();
      }
    } catch (error) {
      interaction.reply({
        content: "Please try again with a valid group ID.",
        ephemeral: true,
      });
      return;
    }
    try {
      userInGroup = await client.userHasGroupPerms(
        interaction.user,
        electionGroupIDInput
      );
      if (!userInGroup) {
        throw new error();
      }
    } catch (error) {
      interaction.reply({
        content: "You do not have electoral permissions for that group.",
        ephemeral: true,
      });
      return;
    }

    var electionRankIDInput =
      interaction.fields.getTextInputValue("election-rank-id");
    try {
      electionRankIDInput = parseInt(electionRankIDInput);
      if (isNaN(electionRankIDInput)) {
        throw new error();
      } else if (electionRankIDInput < 0 || electionRankIDInput > 255) {
        throw new error();
      }
    } catch (error) {
      interaction.reply({
        content: `Please try again with a valid rank ID.`,
        ephemeral: true,
      });
      return;
    }

    var electionTimeInput =
      interaction.fields.getTextInputValue("election-time");
    try {
      electionTimeInput = parseInt(electionTimeInput);
      if (isNaN(electionTimeInput)) {
        throw new error();
      }
      if (electionTimeInput > 48 || electionTimeInput < 12) {
        throw new error();
      }
    } catch (error) {
      interaction.reply({
        content:
          "Please try again with an election length between 12 and 48 hours.",
        ephemeral: true,
      });
      return;
    }

    var numberOfPartiesInput =
      interaction.fields.getTextInputValue("number-of-parties");
    try {
      numberOfPartiesInput = parseInt(numberOfPartiesInput);
      if (isNaN(numberOfPartiesInput)) {
        throw new error();
      }
    } catch (error) {
      interaction.reply({
        content: "Please try again with a valid number of parties.",
        ephemeral: true,
      });
      return;
    }

    const userID = interaction.user.id;

    interaction.reply({
      content: "Creating election...",
      ephemeral: true,
    });

    // Return all the variables and constants
    return {
      electionNameInput,
      electionGroupIDInput,
      electionRankIDInput,
      electionTimeInput,
      numberOfPartiesInput,
      userID,
    };
  },
};
