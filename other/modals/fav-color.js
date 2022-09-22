module.exports = {
  data: {
    name: "fav-color",
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `Your favourite color is: + ${interaction.fields.getTextInputValue(
        "favColorInput"
      )}`,
    });
  },
};
