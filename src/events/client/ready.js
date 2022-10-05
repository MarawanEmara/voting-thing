module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    setInterval(client.pickPresence, 120000);
    console.log(`Logged in as ${client.user.tag}!`);
  },
};
