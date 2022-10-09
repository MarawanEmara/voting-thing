require("dotenv").config();
const mongoose = require("mongoose");
const noblox = require("noblox.js");
const { EmbedBuilder } = require("discord.js");
const verifiedUsers = require("../../schemas/verified-users");

module.exports = (client) => {
  client.createElection = async (interaction) => {};
};
