const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("msg-all")
    .setDescription("Messages all members of the guild")
    .addStringOption((option) =>
      option
        .setName("msg")
        .setDescription("The message to send")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const msg = interaction.options.getString("msg");
    async function send_msg() {
      new Promise((resolve) => {
        interaction.guild.members.fetch().then((members) => {
          members.each((member) => {
            setTimeout(() => {
              if (member.user.bot) return;
              member
                .createDM()
                .then((dm) => {
                  dm.send(msg);
                  console.log(`Sent message to ${member.user.tag}`);
                })
                .catch((err) => {
                  console.log("Error sending message to " + member.user.tag);
                  console.error(err);
                });
            }, 5000);
          });
        });
      });
    }
    await send_msg().then(() => {
      interaction.reply("Sent message to all members");
    });
  },
};
