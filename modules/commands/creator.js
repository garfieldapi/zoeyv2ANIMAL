module.exports.config = {
  name: "creator",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "... - Long LTD",
  description: "War In Chatbox",
  commandCategory: "admin",
  usages: "noprefix",
  cooldowns: 5,
  dependencies: {
      "fs-extra": "",
      "axios": ""
  }
}

module.exports.run = async function({ api, args, Users, event}) {
var mention = Object.keys(event.mentions)[0];

let name =  event.mentions[mention];
  var arraytag = [];
      arraytag.push({id: mention});
  var a = function (a) { api.sendMessage(a, event.threadID); }
a("[ 𝗖𝗥𝗘𝗔𝗧𝗢𝗥 ]\nwww.facebook.com/markqtypie");


}