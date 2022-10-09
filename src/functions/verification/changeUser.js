require("dotenv").config();
const mongoose = require("mongoose");
const botOwnerID = process.env.OWNER_ID;
const userPermissionsDB = require("../../schemas/user-permissions");

module.exports = (client) => {
  client.changeUser = async (interaction, user, group) => {};
};
