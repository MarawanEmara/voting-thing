const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("permission")
    .setDescription("This command requires a permission!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const { roles } = interaction.member;
    const role = await interaction.guild.roles.fetch("").catch(console.error);

    const testRole = await interaction.guild.roles
      .create({
        name: `test`,
        permissions: [PermissionBitField.Flags.KickMembers],
      })
      .catch(console.error);

    // Has role
    if (roles.cache.has("")) {
      await interaction.deferReply({
        fetchReply: true,
      });

      await roles.remove(role).catch(console.error);

      await interaction.editReply({
        content: `Remove ${role.name} from ${interaction.user.username}`,
      });
    } else {
      await interaction.reply({
        content: `You don't have the permission to use this command!`,
      });
    }

    await roles.add(testRole).catch(console.error);

    await testRole
      .setPermission([PermissionBitField.Flags.BanMembers])
      .catch(console.error);

    const channel = await interaction.guild.channels.create({
      name: `test`,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionBitField.Flags.ViewChannel],
        },
        {
          id: testRole.id,
          allow: [PermissionBitField.Flags.ViewChannel],
        },
      ],
    });

    await channel.permissionOverwrites
      .edit(testRole.id, {
        SendMessages: false,
      })
      .catch(console.error);
  },
};
