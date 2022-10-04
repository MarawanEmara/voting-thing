const { Schema, model } = require("mongoose");
const guildSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  guildIcon: { type: String, required: false },
});

module.exports = new model("Guild", guildSchema, "guilds");
