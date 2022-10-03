const {
  SlashCommandBuilder,
  EmbedBuilder,
  Embed,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Returns an embed!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("Embed Description")
      .setColor(0x00ff00)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        url: "https://discord.com",
        name: "Author Name",
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: "Footer Text",
      })
      .setURL("https://discord.com")
      .addFields([
        {
          name: `Field 1`,
          value: `Field value 1`,
          inline: true,
        },
        {
          name: `Field 2`,
          value: `Field value 2`,
          inline: true,
        },
      ]);

    await interaction.reply({ embeds: [embed] });
  },
};
