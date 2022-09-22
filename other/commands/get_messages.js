const { SlashCommandBuilder } = require("discord.js");
const get_messages = require("../../../roblox_cmds.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get_messages")
    .setDescription("Returns the mssages"),
  async execute(interaction, client) {
    const messages = await get_messages();
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `${messages}`;
    await interaction.editReply({ content: newMessage });
  },
};
