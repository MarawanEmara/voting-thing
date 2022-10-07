require("dotenv").config();

// Require the necessary discord.js classes
const token = process.env.DISCORD_TOKEN;
const databaseToken = process.env.DATABASE_TOKEN;
const { connect } = require("mongoose");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

// Create a new client instance
// All intents w/ 32767
const {
  Guilds,
  GuildMembers,
  GuildMessages,
  GuildMessageReactions,
  MessageContent,
  DirectMessages,
  DirectMessageReactions,
} = GatewayIntentBits;
// Guilds, GuildMembers, GuildMessages, GuildMessageReactions
const client = new Client({
  intents: [
    Guilds,
    GuildMembers,
    GuildMessages,
    GuildMessageReactions,
    MessageContent,
    DirectMessages,
    DirectMessageReactions,
  ],
});
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
(async () => {
  connect(databaseToken).catch((err) => console.log(err));
})();
