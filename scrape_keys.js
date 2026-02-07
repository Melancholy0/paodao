const fs = require("fs");
const { chromium } = require("playwright");

const URL = "https://orzice.com/v/keys_day#";
const MAX_PAGES = 30;
const BLOCKLIST = [
  /Orzice/i,
  /Q群/i,
  /QQ群/i,
  /QQ登录/i,
  /浅色/i,
  /深色/i,
  /今日钥匙卡低价预测/,
  /根据以往数据推算出今日低价时间/,
];

const extractNamesFromPage = () => {
  const results = new Set();

  document.querySelectorAll(".table-list-car").forEach((card) => {
    const nameEl = Array.from(card.querySelectorAll(".mt-1")).find(
      (el) => !el.classList.contains("has-text-danger")
    );
    const text = nameEl?.textContent?.trim();
    if (text) results.add(text);
  });

  const candidates = [
    "[class*=card] [class*=name]",
    "[class*=item] [class*=name]",
    ".item-name",
    ".name",
    ".title",
    "[class*=key] [class*=name]",
    "[class*=key] .title",
    "table tr td:first-child",
  ];

  for (const sel of candidates) {
    document.querySelectorAll(sel).forEach((el) => {
      const text = el.textContent?.trim();
      if (text) results.add(text);
    });
  }

  return Array.from(results);
};

const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const distance = 600;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        total += distance;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
};

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const allNames = new Set();

  for (let p = 1; p <= MAX_PAGES; p += 1) {
    await autoScroll(page);
    await page.waitForTimeout(500);

    const names = await page.evaluate(extractNamesFromPage);
    const cleanedPage = names
      .map((x) => x.replace(/\s+/g, " ").trim())
      .filter(Boolean);

    cleanedPage.forEach((name) => allNames.add(name));

    const nextButton = await page.$(
      "button:has-text('下一页'), a:has-text('下一页'), .next, .pagination-next"
    );
    if (!nextButton) break;

    const isDisabled = await nextButton.evaluate((el) =>
      el.matches("[disabled], .disabled, .is-disabled")
    );
    if (isDisabled) break;

    await nextButton.click();
    await page.waitForTimeout(800);
  }

  await browser.close();

  const cleaned = Array.from(allNames).filter(
    (name) => !BLOCKLIST.some((rx) => rx.test(name))
  );

  if (!cleaned.length) {
    console.error("未抓到名称，请检查页面结构并修改选择器。");
    process.exit(1);
  }

  fs.writeFileSync("key_items.json", JSON.stringify(cleaned, null, 2), "utf-8");
  console.log(`抓取完成：${cleaned.length} 条，已写入 key_items.json`);
})();
