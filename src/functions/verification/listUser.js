require("dotenv").config();
const mongoose = require("mongoose");
const userPermissionsDB = require("../../schemas/user-permissions");
const botOwnerID = process.env.OWNER_ID;

module.exports = (client) => {
  client.listUser = async (interaction, user) => {
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
                interaction.reply({
                  content: `${user} has the following permissions: ${data.userPermissions.join(
                    ", "
                  )}.`,
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
