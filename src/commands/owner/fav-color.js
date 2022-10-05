const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fav-color")
    .setDescription("Returns a fav-color modal"),
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setTitle("Favourite Color")
      .setCustomId("fav-color");

    const textInput = new TextInputBuilder()
      .setCustomId("favColorInput")
      .setLabel("What is your favourite color?")
      .setPlaceholder("Enter your favourite color here")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    modal.addComponents(new ActionRowBuilder().addComponents(textInput));

    await interaction.showModal(modal);
  },
};
