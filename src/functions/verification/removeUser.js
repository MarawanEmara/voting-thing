require("dotenv").config();
const mongoose = require("mongoose");
const userPermissionsDB = require("../../schemas/user-permissions");
const botOwnerID = process.env.OWNER_ID;

module.exports = (client) => {
  client.removeUser = async (interaction, user, permission) => {
    // Check if the user is in the database and has the permission
    userPermissionsDB.countDocuments(
      { discordID: user.id },
      async (err, basicCount) => {
        userPermissionsDB.countDocuments(
          { discordID: user.id, userPermissions: { $in: permission } },
          async (err, permCount) => {
            if (interaction.user.id == user.id) {
              interaction.reply({
                content: "You cannot remove permissions from yourself.",
                ephemeral: true,
              });
            } else if (
              permission == "admin" &&
              interaction.user.id !== botOwnerID
            ) {
              interaction.reply({
                content: "You do not have permission to do that.",
                ephemeral: true,
              });
            } else if (basicCount < 1) {
              interaction.reply({
                content: "That user does not have any permissions.",
                ephemeral: true,
              });
            } else if (permCount == 0 && permission != null) {
              interaction.reply({
                content: `${user} does not have the ${permission} permission.`,
                ephemeral: true,
              });
            } else if (permission != null) {
              userPermissionsDB.findOne(
                { discordID: user.id },
                async (err, data) => {
                  if (data) {
                    data.userPermissions.pull(permission);
                    try {
                      await data.save();
                      interaction.reply({
                        content: `Removed ${permission} from ${user.tag}.`,
                        ephemeral: true,
                      });
                    } catch (err) {
                      interaction.reply({
                        content: `There was an error removing ${permission} from ${user.tag}. Please try again later.`,
                        ephemeral: true,
                      });
                    }
                  }
                }
              );
            } else {
              userPermissionsDB.findOneAndDelete(
                { discordID: user.id },
                async (err, data) => {
                  if (data) {
                    interaction.reply({
                      content: `Removed all permissions from ${user.tag}.`,
                      ephemeral: true,
                    });
                  }
                }
              );
            }
          }
        );
      }
    );
  };
};
