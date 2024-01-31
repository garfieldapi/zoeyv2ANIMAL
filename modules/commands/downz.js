module.exports.config = {
  name: "tiktokdl",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Eugene Aguilar",
  description: "Download TikTok videos without watermark.",
  commandCategory: "down",
  usage: "[ Tiktok Video Url ]",
  cooldowns: 5,
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");


module.exports.run = async function({ api, event, args }) {
  try {
   const link = args[0];
   if (!link) {
    api.sendMessage("Please provide a TikTok video URL.", event.threadID);
    return;
   }
   api.sendMessage("Downloading in progress. Please wait!", event.threadID, event.messageID);

   const response = await axios.get(`https://test.peachwings.repl.co/api/tiktok?url=${encodeURIComponent(link)}`);

   const videoUrl = response.data.url;

   if (!videoUrl) {
    api.sendMessage("No video found for the given link.", event.threadID);
    return;
   }

   const videoResponse = await axios({
    method: "get",
    url: videoUrl,
    responseType: "stream",
   });

   const filePath = path.join(__dirname, "cache", "tiktok_video.mp4");
   videoResponse.data.pipe(fs.createWriteStream(filePath));

   videoResponse.data.on("end", () => {
    api.sendMessage(
      {
       attachment: fs.createReadStream(filePath),
       body: `Downloaded Successfully!`,
      },
      event.threadID,
      () => fs.unlinkSync(filePath)
    );
   });
  } catch (error) {
   console.error("Error:", error);
   api.sendMessage("An error occurred while processing the request.", event.threadID);
  }
};