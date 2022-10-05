const { Options } = require("discord.js");
const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Watching,
        text: `${client.guilds.cache.size} servers!`,
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: `for commands`,
        status: "idle",
      },
      {
        type: ActivityType.Playing,
        text: `with ${client.users.cache.size} users!`,
        status: "dnd",
      },
    ];

    const option = Math.floor(Math.random() * options.length);
    console.log(option);

    try {
      client.user.setPresence({
        activities: [
          {
            name: options[option].text,
            type: options[option].type,
          },
        ],
        status: options[option].status,
      });
      console.log(`Presence changed`);
    } catch (error) {
      console.log(error);
    }
  };
};
