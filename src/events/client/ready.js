module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await client.pickPresence();
    ///setInterval(client.pickPresence, 60000);
    console.log(`Logged in as ${client.user.tag}!`);
  },
};
