require("dotenv").config();
const mongoose = require("mongoose");
const userPermissionsDB = require("../../schemas/user-permissions");
const botOwnerID = process.env.OWNER_ID;

module.exports = (client) => {
  // Checks if a user has any permissions.
  client.userHasPerms = async (user) => {
    count = await userPermissionsDB.countDocuments({ discordID: user.id });
    if (count > 0 || user.id == botOwnerID) {
      return true;
    } else if (count == 0) {
      return false;
    } else {
      throw error;
    }
  };

  // Checks if a user has the admin permission.
  client.userHasAdmin = async (user) => {
    count = await userPermissionsDB.countDocuments({
      discordID: user.id,
      userPermissions: { $in: "admin" },
    });
    if (count > 0 || user.id == botOwnerID) {
      return true;
    } else if (count == 0) {
      return false;
    } else {
      throw error;
    }
  };

  // Checks if a user has the election permission.
  client.userHasManager = async (user) => {
    count = await userPermissionsDB.countDocuments({
      discordID: user.id,
      userPermissions: { $in: "manager" },
    });
    if (count > 0 || user.id == botOwnerID) {
      return true;
    } else if (count == 0) {
      return false;
    } else {
      throw error;
    }
  };

  client.userHasGroupPerms = async (user, groupID) => {
    count = await userPermissionsDB.countDocuments({
      discordID: user.id,
      groupsIDs: { $in: groupID },
    });
    if (count > 0 || user.id == botOwnerID) {
      return true;
    } else if (count == 0) {
      return false;
    } else {
      throw error;
    }
  };
};
