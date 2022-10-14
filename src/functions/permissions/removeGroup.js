require("dotenv").config();
const mongoose = require("mongoose");
const noblox = require("noblox.js");
const botOwnerID = process.env.OWNER_ID;
const userPermissionsDB = require("../../schemas/user-permissions");

module.exports = (client) => {
  client.removeGroup = async (interaction, user, group) => {
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
    } else if (!userAndGroupInDB) {
      await interaction.reply({
        content: `${user} does not have permission for group ${groupName}.`,
        ephemeral: true,
      });
    } else {
      try {
        await userPermissionsDB.findOneAndUpdate(
          { discordID: user.id },
          { $pull: { groupsIDs: group } }
        );
        await interaction.reply({
          content: `Removed ${user} from group ${groupName}.`,
          ephemeral: true,
        });
      } catch (err) {
        await interaction.reply({
          content: `An error occurred while removing ${user} from group ${groupName}.`,
          ephemeral: true,
        });
      }
    }
  };
};
