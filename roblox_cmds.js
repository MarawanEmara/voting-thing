require("dotenv").config();

// Dependencies
const noblox = require("noblox.js");

async function startApp() {
  const currentUser = await noblox.setCookie(process.env.ROBLOSECURITY_TOKEN);
  console.log("Logged in as " + currentUser.UserName);

  noblox.getMessages((messageTab = "Inbox")).then((messages_pages) => {
    messages = messages_pages.collection;
    for (var i = 0; i < messages.length; i++) {
      console.log(
        "Message from " +
          messages[i].sender.displayName +
          ": " +
          messages[i].body +
          " received at " +
          messages[i].created
      );
    }
  });
}

startApp();
