// functions/scrapeData.js (Netlify Function)
const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
  try {
    const response = await axios.get("https://bigmumbai.biz/#/home/AllLotteryGames/WinGo?typeId=1");
    const $ = cheerio.load(response.data);
    
    const scrapedData = [];

    $(".GameRecord__C-body").each((index, element) => {
      const period = $(element).find(".van-col--8").text();
      const number = $(element).find(".GameRecord__C-body-num").text();
      const bigSmall = $(element).find(".van-col--5").text();
      const color = $(element).find(".GameRecord__C-origin-I").attr("class").split(" ")[1];

      scrapedData.push({ Period: period, Number: number, BigSmall: bigSmall, Color: color });
    });

    return {
      statusCode: 200,
      body: JSON.stringify(scrapedData)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to scrape data." })
    };
  }
};
