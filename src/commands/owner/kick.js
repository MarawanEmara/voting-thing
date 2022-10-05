const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks the mentioned user")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for kicking the user")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);
    const reason = interaction.options.getString("reason");
    if (!reason) {
      reason = "No reason provided.";
    }
    if (!member) {
      return interaction.reply({
        content: "That user is not in this guild!",
        ephemeral: true,
      });
    }
    if (!member.kickable) {
      return interaction.reply({
        content: "I cannot kick that user.",
        ephemeral: true,
      });
    }
    await member.kick(reason).catch((error) =>
      interaction.reply({
        content: `Sorry, an error occurred.`,
        ephemeral: true,
      })
    );
    interaction.reply({
      content: `Successfully kicked ${user.tag}`,
      ephemeral: true,
    });
  },
};
