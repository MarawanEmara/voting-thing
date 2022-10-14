require("dotenv").config();
const mongoose = require("mongoose");
const userPermissionsDB = require("../../schemas/user-permissions");
const noblox = require("noblox.js");
const botOwnerID = process.env.OWNER_ID;

module.exports = (client) => {
  client.listGroups = async (interaction, user) => {
    userPermissionsDB.countDocuments(
      { discordID: user.id },
      async (err, count) => {
        if (count == 0) {
          interaction.reply({
            content: "That user does not have any permissions.",
            ephemeral: true,
          });
        } else {
          userPermissionsDB.findOne(
            { discordID: user.id },
            async (err, data) => {
              if (data) {
                const groupsList = data.groupsIDs;
                const groupsNamesList = [];
                for (let i = 0; i < groupsList.length; i++) {
                  const groupInfo = await noblox.getGroup(
                    Number(groupsList[i])
                  );
                  const groupName = groupInfo.name;
                  groupsNamesList.push(groupName);
                }
                interaction.reply({
                  content: `${user} has permissions for the following groups: \`${groupsNamesList.join(
                    ", "
                  )}\`.`,
                  ephemeral: true,
                });
              }
            }
          );
        }
      }
    );
  };
};
