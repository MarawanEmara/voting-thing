require("dotenv").config();
const mongoose = require("mongoose");
const botOwnerID = process.env.OWNER_ID;
const userPermissionsDB = require("../../schemas/user-permissions");

module.exports = (client) => {
  client.addUser = async (interaction, user, permission) => {
    // Check if the user is in the database and has the permission
    userPermissionsDB.countDocuments(
      { discordID: user.id },
      async (err, basicCount) => {
        userPermissionsDB.countDocuments(
          { discordID: user.id, userPermissions: { $in: permission } },
          async (err, permCount) => {
            if (interaction.user.id == user.id) {
              interaction.reply({
                content: "You cannot add permissions to yourself.",
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
            } else if (permCount > 0) {
              interaction.reply({
                content: `${user} already has the ${permission} permission.`,
                ephemeral: true,
              });
            } else {
              if (basicCount > 0) {
                userPermissionsDB.findOne(
                  { discordID: user.id },
                  async (err, data) => {
                    if (data) {
                      data.userPermissions.push(permission);
                      try {
                        await data.save();
                        interaction.reply({
                          content: `Added ${permission} permissions to ${user}.`,
                          ephemeral: true,
                        });
                      } catch (err) {
                        interaction.reply({
                          content: `There was an error adding ${permission} to ${user}. Please try again later.`,
                          ephemeral: true,
                        });
                      }
                    }
                  }
                );
              } else {
                const newUser = new userPermissionsDB({
                  _id: mongoose.Types.ObjectId(),
                  discordID: user.id,
                  userPermissions: [permission],
                });
                try {
                  await newUser.save();
                  interaction.reply({
                    content: `Successfully added ${permission} to ${user}.`,
                    ephemeral: true,
                  });
                } catch (error) {
                  interaction.reply({
                    content: `There was an error adding ${permission} to ${user}. Please try again later.`,
                    ephemeral: true,
                  });
                }
              }
            }
          }
        );
      }
    );
  };
};
