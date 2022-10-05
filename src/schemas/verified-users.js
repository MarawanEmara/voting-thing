const { Schema, model } = require("mongoose");
const verifiedUsersSchema = new Schema({
  _id: Schema.Types.ObjectId,
  robloxID: String,
  discordID: String,
});

module.exports = new model(
  "Verified User",
  verifiedUsersSchema,
  "verified-users"
);
