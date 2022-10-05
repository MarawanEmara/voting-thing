const { Options } = require("discord.js");
const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Watching,
        text: `over ${client.guilds.cache.size} server${withOrWithouts(
          client.guilds.cache.size
        )}!`,
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: `${client.users.cache.size} user${withOrWithouts(
          client.users.cache.size
        )}!`,
        status: "online",
      },
      {
        type: ActivityType.Playing,
        text:
          `with ${client.users.cache.size} user${withOrWithouts(
            client.users.cache.size
          )}!` || "with the code!",
        status: "dnd",
      },
    ];

    const option = Math.floor(Math.random() * options.length);

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
    } catch (error) {
      console.log(error);
    }
  };
};

withOrWithouts = (number) => {
  if (number < 2) {
    return "";
  } else {
    return "s";
  }
};
