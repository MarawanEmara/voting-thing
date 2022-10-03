const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reactor2")
    .setDescription("Returns a bunch of reaction!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const message = await interaction.reply({
      content: "React to this message!",
      fetchReply: true,
    });

    const filter = (reaction, user) => {
      return reaction.emoji.name === "👍" && user.id === interaction.user.id;
    };

    message
      .awaitReactions({ filter, max: 1, time: 10000, errors: ["time"] })
      .then((collected) => {
        console.log(collected.size);
      })
      .catch((collected) => {
        console.log(collected);
      });
  },
};
