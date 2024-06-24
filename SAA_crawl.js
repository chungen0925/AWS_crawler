const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs"); // 引入fs模塊，用於檔案操作

// 探尋並存檔，標題含 Machine Learning 詞緣
async function searchAndSaveSaa(startPage, endPage) {
  let contentToSave = ""; // 初始化空字串，用於儲存所有欲存的內容

  for (let page = startPage; page <= endPage; page++) {
    const url = `https://www.examtopics.com/discussions/amazon/${page}/`;
    console.log(`This is page ${page}`);

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      $("a").each((index, element) => {
        const linkText = $(element).text();
        if (linkText.includes("SAA")) {
          const href = $(element).attr("href");
          contentToSave += `Found Associate SAA content: ${linkText} - URL: ${href}\n`; // 將找到的內容加到字串中，以及換行符
        }
      });
    } catch (error) {
      console.error(`Failed to fetch page ${page}`, error);
    }
  }
  console.log("End of crawler, now start to write file");
  // 將累積的字串寫入一個.txt檔案中
  fs.writeFile("SaaContentLinks.txt", contentToSave, (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("File has been saved successfully."); // 成功儲存檔案時顯示
    }
  });
}

// 將範圍設為從第1頁到第487頁，尋找 SAA 相關內容並儲存
searchAndSaveSaa(1, 487);
