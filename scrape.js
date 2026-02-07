const fs = require("fs");
const { chromium } = require("playwright");

const URL =
  "https://orzice.com/v/scp_book?top=3-2&grade=6&mtype=-1&n=&p=";

const MAX_PAGES = 20;
const BLOCKLIST = [
  /Orzice/i,
  /Q群/i,
  /QQ群/i,
  /QQ登录/i,
  /三角洲数据帝/i,
  /浅色/i,
  /深色/i,
];

const extractNamesFromPage = () => {
  const results = new Set();

  const candidates = [
    "[class*=card] [class*=name]",
    "[class*=item] [class*=name]",
    ".item-name",
    ".name",
    ".title",
  ];

  for (const sel of candidates) {
    document.querySelectorAll(sel).forEach((el) => {
      const text = el.textContent?.trim();
      if (text) results.add(text);
    });
  }

  if (results.size === 0) {
    document.querySelectorAll("[class*=card],[class*=item]").forEach((el) => {
      const text = el.textContent?.trim().split("\n")[0]?.trim();
      if (text) results.add(text);
    });
  }

  return Array.from(results);
};

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const allNames = new Set();

  for (let p = 1; p <= MAX_PAGES; p += 1) {
    await page.goto(`${URL}${p}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    const names = await page.evaluate(extractNamesFromPage);
    const cleanedPage = names
      .map((x) => x.replace(/\s+/g, " ").trim())
      .filter(Boolean);

    cleanedPage.forEach((name) => allNames.add(name));

    if (cleanedPage.length === 0) {
      break;
    }
  }

  await browser.close();

  const cleaned = Array.from(allNames).filter(
    (name) => !BLOCKLIST.some((rx) => rx.test(name))
  );

  if (!cleaned.length) {
    console.error("未抓到名称，请检查页面结构并修改选择器。");
    process.exit(1);
  }

  fs.writeFileSync("red_items.json", JSON.stringify(cleaned, null, 2), "utf-8");
  console.log(`抓取完成：${cleaned.length} 条，已写入 red_items.json`);
})();
