const { Schema, model } = require("mongoose");
const userPermissionsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  discordID: String,
  userPermissions: [String],
  groupsIDs: [String],
});

module.exports = new model(
  "User Permissions",
  userPermissionsSchema,
  "user-permissions"
);
