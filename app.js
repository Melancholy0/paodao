const plannedInput = document.getElementById("planned");
const currentInput = document.getElementById("current");
const remainingOutput = document.getElementById("remaining");

const categorySelect = document.getElementById("category");
const nameInput = document.getElementById("item-name");
const valueInput = document.getElementById("item-value");
const addButton = document.getElementById("add-item");
const tableBody = document.getElementById("item-body");

const sumSmall = document.getElementById("sum-small");
const sumCard = document.getElementById("sum-card");
const sumBig = document.getElementById("sum-big");
const sumTotal = document.getElementById("sum-total");

const items = [];

const formatNumber = (value) => {
  if (Number.isNaN(value)) return "0";
  return value.toLocaleString("zh-CN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

const updateRemaining = () => {
  const planned = Number(plannedInput.value || 0);
  const current = Number(currentInput.value || 0);
  const remaining = Math.max(planned - current, 0);
  remainingOutput.textContent = formatNumber(remaining);
};

const renderItems = () => {
  tableBody.innerHTML = "";

  const sums = {
    小红: 0,
    房卡: 0,
    大红: 0,
  };

  items.forEach((item, index) => {
    sums[item.category] += item.value;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.category}</td>
      <td>${item.name}</td>
      <td>${formatNumber(item.value)}</td>
      <td><button type="button" data-index="${index}">移除</button></td>
    `;
    tableBody.appendChild(row);
  });

  sumSmall.textContent = formatNumber(sums["小红"]);
  sumCard.textContent = formatNumber(sums["房卡"]);
  sumBig.textContent = formatNumber(sums["大红"]);
  sumTotal.textContent = formatNumber(sums["小红"] + sums["房卡"] + sums["大红"]);
};

const resetEntry = () => {
  nameInput.value = "";
  valueInput.value = "";
  nameInput.focus();
};

addButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const value = Number(valueInput.value);

  if (!name || Number.isNaN(value) || value <= 0) {
    alert("请填写有效的名称和价值。");
    return;
  }

  items.push({
    category: categorySelect.value,
    name,
    value,
  });

  renderItems();
  resetEntry();
});

tableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const index = Number(button.dataset.index);
  if (Number.isNaN(index)) return;

  items.splice(index, 1);
  renderItems();
});

plannedInput.addEventListener("input", updateRemaining);
currentInput.addEventListener("input", updateRemaining);

updateRemaining();
renderItems();
