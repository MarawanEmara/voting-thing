require("dotenv").config();
const mongoose = require("mongoose");
const noblox = require("noblox.js");
const botOwnerID = process.env.OWNER_ID;
const userPermissionsDB = require("../../schemas/user-permissions");

module.exports = (client) => {
  client.addGroup = async (interaction, user, group) => {
    group = parseInt(group);
    groupInfo = await noblox.getGroup(group);
    groupName = groupInfo.name;
    const userInDB = await userPermissionsDB.findOne({ discordID: user.id });
    const userAndGroupInDB = await userPermissionsDB.findOne({
      discordID: user.id,
      groupsIDs: group,
    });
    if (!userInDB) {
      await interaction.reply({
        content: `${user} does not have any permissions.`,
        ephemeral: true,
      });
    } else if (userAndGroupInDB) {
      await interaction.reply({
        content: `${user} already has permission for group ${groupName}.`,
        ephemeral: true,
      });
    } else {
      if (groupName != undefined) {
        try {
          await userPermissionsDB.findOneAndUpdate(
            { discordID: user.id },
            { $push: { groupsIDs: group } }
          );
          await interaction.reply({
            content: `Added ${user} to group ${groupName}.`,
            ephemeral: true,
          });
        } catch (err) {
          await interaction.reply({
            content: `An error occurred while adding ${user} to group ${groupName}.`,
            ephemeral: true,
          });
        }
      } else {
        interaction.reply({
          content: `No Roblox group with that ID exists.`,
          ephemeral: true,
        });
      }
    }
  };
};
