const puppeteer = require("puppeteer");
const league = "13"; // Premier League
const pages = [1, 2, 3, 4, 5]; // First 5 pages from FUTBIN

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  for (const pageNumber of pages) {
    await page.goto(
      `https://www.futbin.com/21/players?page=${pageNumber}&league=${league}`
    );

    const players = await page.evaluate(() => {
      let elements = document.querySelectorAll(
        "tr.player_tr_1, tr.player_tr_2"
      );
      let allPlayers = [];
      for (element of elements) {
        allPlayers.push({
          name: element.querySelector("td div a ")?.textContent,
          position: element.querySelector("td + td + td ")?.textContent,
          version: element.querySelector("td.mobile-hide-table-col")
            ?.textContent,
          price: element
            .querySelector("td + td + td + td + td > span ")
            .textContent.trim(),
          rate: element.querySelector("td > span")?.textContent,
        });
      }
      return allPlayers;
    });
    console.log(players);
  }
  await browser.close();
})().catch((err) => {
  console.log(err);
});
