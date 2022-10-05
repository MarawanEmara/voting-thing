const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      if (folder === "owner") continue;

      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const clientId = process.env.DISCORD_CLIENT_ID;
    const guildId = process.env.DISCORD_GUILD_ID;
    const guildIds = [
      process.env.DISCORD_GUILD_ID,
      process.env.DISCORD_GUILD_ID_2,
    ];
    const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);
    try {
      console.log("Started refreshing application (/) commands.");
      for (const guildId of guildIds) {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
          body: client.commandArray,
        });
      }
      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
