const chalk = require("chalk");

module.exports = {
  name: "disconnected",
  execute() {
    console.log(chalk.redBright("[Database Status]: Disconnected!"));
  },
};
