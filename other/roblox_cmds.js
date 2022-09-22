require("dotenv").config();

// Dependencies
const noblox = require("noblox.js");

module.exports = async () => {
  const currentUser = await noblox.setCookie(process.env.ROBLOSECURITY_TOKEN);
  console.log("Logged in as " + currentUser.UserName);
  var senders_list = [];
  messages = await noblox
    .getMessages((messageTab = "Inbox"))
    .then((messages_pages) => {
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
        senders_list.push(messages[i].sender.displayName);
      }
    });
  console.log(senders_list);
  return senders_list;
};
