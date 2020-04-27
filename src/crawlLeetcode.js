const fs = require('fs');
const $ = require('axios');
const puppeteer = require('puppeteer');


const crawlProblems = async () => {
  const response = await $.get('https://leetcode.com/api/problems/all/');
  const orgProblems = response.data['stat_status_pairs'];
  const savedProblems = {};

  for (const problem of orgProblems) {
    const stat = problem['stat'];
    let acceptance = '0%';
    if (stat['total_submitted']) {
      acceptance = (stat['total_acs'] / stat['total_submitted'] * 100).toFixed(2) + '%';
    }
    savedProblems[stat['question_id']] = {
      problemNumber: stat['question_id'],
      title: stat['question__tile'],
      slug: stat['question__title_slug'],
      likes: 0,
      dislikes: 0,
      difficulty: problem['difficulty']['level'],
      accepted: stat['total_acs'],
      submitted: stat['total_submitted'],
      acceptance,
      rate: "0%"
    }
  }

  fs.writeFileSync('../public/problems.json', JSON.stringify(savedProblems));
};


const crawlLikes = async () => {
  const f = fs.readFileSync('../public/problems.json', 'utf8')
  const problems = JSON.parse(f);
  const browser = await puppeteer.launch({});
  try {
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    for (const p of Object.values(problems)) {
      console.log(p.problemNumber);
      try {
        await page.goto(`https://leetcode.com/problems/${p.slug}`, {
          timeout: 30000,
          waitUntil: "networkidle2"
        });
        const $likes = await page.$("#app > div > div > div > div > div > div > div > div > div > div > div > div > div > button:nth-child(2) > span");
        const $dislikes = await page.$("#app > div > div > div > div > div > div > div > div > div > div > div > div > div > button:nth-child(3) > span");
        const likes = await page.evaluate(el => el.textContent, $likes);
        const dislikes = await page.evaluate(el => el.textContent, $dislikes);
        problems[p.problemNumber].likes = parseInt(likes);
        problems[p.problemNumber].dislikes = parseInt(dislikes);
        if (likes) {
          problems[p.problemNumber].rate = ((likes / (likes + dislikes)) * 100).toFixed(2) + "%";
        }
        fs.writeFileSync('../public/problems.json', JSON.stringify(problems));

      } catch (e) {
        console.error(`https://leetcode.com/problems/${p.slug}\n` + e);
      }
    }
  } finally {
    browser.close();
  }
};

(async () => {
  await crawlProblems();
  await crawlLikes();
})();