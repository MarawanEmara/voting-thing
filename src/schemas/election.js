const { Schema, model } = require("mongoose");

const partySchema = new Schema({
  _id: Schema.Types.ObjectId,
  partyName: String,
  partyNameAbbreviation: String,
  partyLeader: String,
  partyManifesto: String,
});

module.exports = new model("Party", partySchema, "parties");

const electionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  electionName: String,
  creatorID: String,
  groupID: String,
  parties: [partySchema],
  time: { type: Number, min: 12, max: 48, default: 24 },
  date: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = new model("Election", electionSchema, "elections");
