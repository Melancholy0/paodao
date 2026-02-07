const fs = require("fs");

const redPath = "red_items.json";
const keyPath = "key_items.json";
const appPath = "app.js";

const readJsonArray = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) {
    throw new Error(`Expected array in ${filePath}`);
  }
  return data.map((x) => String(x).trim()).filter(Boolean);
};

const buildArrayBlock = (label, items) => {
  const lines = items.map((item) => `  ${JSON.stringify(item)},`);
  return [
    `// BEGIN ${label} (auto-generated)`,
    `const ${label} = [`,
    ...lines,
    `];`,
    `// END ${label} (auto-generated)`,
  ].join("\n");
};

const replaceBlock = (content, label, block) => {
  const start = `// BEGIN ${label} (auto-generated)`;
  const end = `// END ${label} (auto-generated)`;
  const pattern = new RegExp(
    `${start}[\\s\\S]*?${end}`,
    "m"
  );
  if (!pattern.test(content)) {
    throw new Error(`Missing block markers for ${label} in ${appPath}`);
  }
  return content.replace(pattern, block);
};

const main = () => {
  const redItems = readJsonArray(redPath);
  const keyItems = readJsonArray(keyPath);

  const appContent = fs.readFileSync(appPath, "utf-8");

  const redBlock = buildArrayBlock("RED_ITEMS", redItems);
  const keyBlock = buildArrayBlock("KEY_ITEMS", keyItems);

  const nextContent = replaceBlock(appContent, "RED_ITEMS", redBlock);
  const finalContent = replaceBlock(nextContent, "KEY_ITEMS", keyBlock);

  fs.writeFileSync(appPath, finalContent, "utf-8");
  console.log(
    `Updated app.js with ${redItems.length} red items and ${keyItems.length} key items.`
  );
};

main();
