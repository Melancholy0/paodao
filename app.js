const plannedInput = document.getElementById("planned");
const currentInput = document.getElementById("current");
const accountInput = document.getElementById("account");
const progressOutput = document.getElementById("progress");
const remainingOutput = document.getElementById("remaining");

const categorySelect = document.getElementById("category");
const nameInput = document.getElementById("item-name");
const qtyInput = document.getElementById("item-qty");
const valueInput = document.getElementById("item-value");
const addButton = document.getElementById("add-item");
const tableBody = document.getElementById("item-body");
const suggestionList = document.getElementById("name-suggestions");

const sumRed = document.getElementById("sum-red");
const sumCard = document.getElementById("sum-card");
const sumOther = document.getElementById("sum-other");
const sumTotal = document.getElementById("sum-total");

const navHistory = document.getElementById("nav-history");
const navStart = document.getElementById("nav-start");
const homeTitle = document.getElementById("home-title");
const historyView = document.getElementById("history-view");
const startView = document.getElementById("start-view");
const detailView = document.getElementById("detail-view");

const gameIdInput = document.getElementById("game-id");
const uidInput = document.getElementById("uid");
const startRunButton = document.getElementById("start-run");
const searchInput = document.getElementById("search-input");
const clearSearchButton = document.getElementById("clear-search");
const historyList = document.getElementById("history-list");
const statsGrid = document.getElementById("stats-grid");
const exportButton = document.getElementById("export-data");
const importInput = document.getElementById("import-data");
const quickStartButton = document.getElementById("quick-start");

const timerDisplay = document.getElementById("timer-display");
const timerTotal = document.getElementById("timer-total");
const timerStartButton = document.getElementById("timer-start");
const timerStopButton = document.getElementById("timer-stop");
const backHistoryButton = document.getElementById("back-history");
const finishRunButton = document.getElementById("finish-run");
const finishModal = document.getElementById("finish-modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");
const modalConfirm = document.getElementById("modal-confirm");

const runIdLabel = document.getElementById("current-run-id");
const runUidLabel = document.getElementById("current-run-uid");
const runBalanceLabel = document.getElementById("current-run-balance");
const progressPercentLabel = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");

const runMapInput = document.getElementById("run-map");
const runModeInput = document.getElementById("run-mode");
const runNoteInput = document.getElementById("run-note");

const STORAGE_KEY = "paodao_runs";
let runs = [];
let currentRunId = null;
let timerInterval = null;

// BEGIN RED_ITEMS (auto-generated)
const RED_ITEMS = [
  "手弩赤小枭",
  "炫彩威小龙",
  "马上转运",
  "勇者之证",
  "暗星燃料单元",
  "便携式生命支持系统",
  "恒星敏感器",
  "巨兽机甲",
  "渡鸦的录音数据-1",
  "阿萨拉极品平安果",
  "烽火世界杯纪念奖杯",
  "炫彩拉小宅",
  "比利狼",
  "黄金鳄鱼头雕像",
  "名窑瓷器",
  "超声波切割刀",
  "高能瓦斯罐",
  "试制聚变供能单元",
  "炫彩鸟蛋",
  "黄金鸟蛋",
  "鎏金卡牌",
  "黄金鸟窝",
  "炫彩兰小登",
  "电子脚镣",
  "“雷明顿”打字机",
  "已封存音源",
  "定位接收器",
  "印象派名画",
  "至纯源石",
  "手办-阿米娅（近卫）",
  "炫彩克小圈",
  "Alpha脑机实验数据-渡鸦",
  "潮汐监狱地图-4",
  "浮力补偿设备",
  "海洋之泪",
  "吴彦祖之镜",
  "幸运木雕",
  "炫彩麦小蛋",
  "乙巳玄武",
  "“钻石”鱼子酱",
  "ECMO",
  "“纵横”",
  "“天圆地方”",
  "万金泪冠",
  "雷斯的留声机",
  "医疗机械人",
  "动力电池组",
  "装甲车电池",
  "微型反应炉",
  "复苏呼吸机",
  "高级咖啡豆",
  "强力吸尘器",
  "扫拖一体机器人",
  "云存储阵列",
  "自动体外除颤器",
  "绝密服务器",
  "名贵机械表",
  "步战车模型",
  "主战坦克模型",
  "军用信息终端",
  "便携军用雷达",
  "曼德尔超算单元",
  "赛伊德的怀表",
  "万足金条",
  "非洲之心",
  "滑膛枪展品",
  "棘龙爪化石",
  "量子存储",
  "实验数据",
  "奥莉薇娅香槟",
  "呼吸机",
  "克劳迪乌斯半身像",
  "军用控制终端",
  "军用炮弹",
  "飞行记录仪",
  "G.T.I卫星通信天线",
  "高速磁盘阵列",
  "刀片服务器",
  "笔记本电脑",
  "军用电台",
  "军用无人机",
  "显卡",
  "摄影机",
  "火箭燃料",
  "强化碳纤维板",
  "黄金瞪羚",
];
// END RED_ITEMS (auto-generated)

// BEGIN KEY_ITEMS (auto-generated)
const KEY_ITEMS = [
  "变电站宿舍",
  "西楼医务室",
  "变电站技术室",
  "东楼经理室",
  "蓝室核心",
  "酒店国王房",
  "雷达站无人机平台",
  "西楼调控房",
  "西楼监视室",
  "东区吊桥",
  "酒店王子房",
  "雷达站控制室",
  "实验楼办公室",
  "酒店将军房",
  "巴别塔供电权限卡",
  "水泥厂宿舍201",
  "军营保管室",
  "售票办公室",
  "中心贵宾室",
  "地下通道钥匙",
  "中控室三楼",
  "组装车间二楼实验室",
  "蓝室玻璃房",
  "雷达站会议室",
  "运输机会议室",
  "小镇餐厅",
  "旅店员工休息室",
  "西城民宅卧室",
  "东城民宅卧室",
  "老浴场餐厅",
  "海洋监测厅",
  "雷达侧门钥匙",
  "检查站库房",
  "牧场管理房",
  "铁脊车站售票室",
  "生物样本室",
  "典狱长收藏室",
  "三级监狱权限卡",
  "二级监狱权限卡",
  "监狱体检室",
  "仓库区监控房",
  "监狱服务器房",
  "食堂洗碗间",
  "一级监狱权限卡",
  "实验楼资料室",
  "博物馆监控室",
  "生物数据机房",
  "医疗会议室",
  "员工通道",
  "监狱审讯室",
  "顶层办公间",
  "设备领用室",
  "酒店黑桃房",
  "酒店方片房",
  "博物馆废弃展厅",
  "总裁会议室",
  "人偶影印室",
  "蓝室数据中心",
  "雷达站数据中心",
  "浮力室医务间",
  "老浴场贵宾室",
  "Relink植入手术室",
  "门诊室",
  "水泥厂办公室",
  "西区大门",
  "3号宿舍里屋",
  "博物馆展厅套间",
  "1号审讯室",
  "旅店用餐间",
  "水位控制室",
  "黑室服务器室",
  "地下金库储藏间",
  "总裁室会客厅",
];
// END KEY_ITEMS (auto-generated)

const SUGGESTIONS = {
  红色收集品: RED_ITEMS,
  房卡: KEY_ITEMS,
  其他: ["盒装挂耳咖啡", "可编程处理器"],
};

const PLACEHOLDERS = {
  红色收集品: "例如 坦克模型",
  房卡: "例如 变电站宿舍",
  其他: "例如 自定义物品",
};

const formatNumber = (value) => {
  if (Number.isNaN(value)) return "0";
  return value.toLocaleString("zh-CN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

const formatW = (valueW) => `${formatNumber(valueW)}W`;

const formatWWithFull = (valueW) => {
  const full = valueW * 10000;
  return `${formatNumber(valueW)}W (${formatNumber(full)})`;
};

const formatDate = (ts) => {
  if (!ts) return "-";
  const date = new Date(ts);
  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateOnly = (ts) => {
  if (!ts) return "-";
  const date = new Date(ts);
  return date.toLocaleDateString("zh-CN");
};

const formatShortDate = (ts) => {
  if (!ts) return "-";
  const date = new Date(ts);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const formatDuration = (seconds = 0) => {
  const total = Math.max(0, Math.floor(seconds));
  const hrs = String(Math.floor(total / 3600)).padStart(2, "0");
  const mins = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const secs = String(total % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
};

const clampPercent = (value) => {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, value));
};

const setActiveView = (viewId) => {
  const views = [historyView, startView, detailView];
  views.forEach((view) => view.classList.add("hidden"));
  if (viewId === "history") historyView.classList.remove("hidden");
  if (viewId === "start") startView.classList.remove("hidden");
  if (viewId === "detail") detailView.classList.remove("hidden");

  navHistory.classList.toggle("active", viewId === "history");
  navStart.classList.toggle("active", viewId === "start");
};

const goHome = () => {
  setActiveView("history");
  renderHistory();
  renderStats();
};

const loadRuns = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    runs = raw ? JSON.parse(raw) : [];
  } catch {
    runs = [];
  }
};

const saveRuns = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
};

const createRun = (gameId, uid) => {
  const now = Date.now();
  return {
    id: `run_${now}`,
    gameId,
    uid,
    startedAt: now,
    endedAt: null,
    durationSec: 0,
    timer: {
      running: false,
      startAt: null,
      elapsedSec: 0,
    },
    planned: 0,
    currentBalance: 0,
    startBalance: 0,
    items: [],
    map: "",
    mode: "",
    note: "",
    remaining: 0,
    progressPercent: 0,
  };
};

const getCurrentRun = () => runs.find((run) => run.id === currentRunId);

const getTotals = (items) => {
  return items.reduce(
    (acc, item) => {
      acc[item.category] += item.totalW;
      acc.total += item.totalW;
      return acc;
    },
    { 红色收集品: 0, 房卡: 0, 其他: 0, total: 0 }
  );
};

const updateRemaining = () => {
  const run = getCurrentRun();
  if (!run) return;

  const planned = Number(plannedInput.value || 0);
  const currentBalance = Number(currentInput.value || 0);
  const startBalance = Number(accountInput.value || 0);
  const totals = getTotals(run.items);

  run.planned = planned;
  run.currentBalance = currentBalance;
  run.startBalance = startBalance;
  runBalanceLabel.textContent = `当前账号：${formatW(currentBalance || 0)}`;

  const baseProgress = currentBalance - startBalance;
  const progress = baseProgress + totals.total;
  const remaining = Math.max(planned - progress, 0);
  const percent = planned > 0 ? clampPercent((progress / planned) * 100) : 0;

  progressOutput.textContent = formatWWithFull(progress);
  remainingOutput.textContent = formatWWithFull(remaining);
  if (progressPercentLabel) {
    progressPercentLabel.textContent = `${percent.toFixed(1)}%`;
  }
  if (progressFill) {
    progressFill.style.width = `${percent.toFixed(1)}%`;
  }
  run.remaining = remaining;
  run.progressPercent = percent;
  finishRunButton.disabled = !(planned > 0 && remaining <= 0);
  saveRuns();
};

const renderItems = () => {
  const run = getCurrentRun();
  if (!run) return;

  tableBody.innerHTML = "";
  const totals = getTotals(run.items);

  run.items.forEach((item, index) => {
    const isValuable = item.unitW >= 100;
    const row = document.createElement("tr");
    if (isValuable) row.classList.add("valuable-row");
    row.innerHTML = `
      <td>${item.category}</td>
      <td>${item.name}</td>
      <td>${formatNumber(item.qty)}</td>
      <td class="${isValuable ? "valuable" : ""}">${formatW(item.unitW)}</td>
      <td class="${isValuable ? "valuable" : ""}">${formatW(item.totalW)}</td>
      <td><button type="button" data-index="${index}">移除</button></td>
    `;
    tableBody.appendChild(row);
  });

  sumRed.textContent = formatW(totals.红色收集品);
  sumCard.textContent = formatW(totals.房卡);
  sumOther.textContent = formatW(totals.其他);
  sumTotal.textContent = formatW(totals.total);

  updateRemaining();
};

const resetEntry = () => {
  nameInput.value = "";
  qtyInput.value = "1";
  valueInput.value = "";
  nameInput.focus();
};

const updateNamePlaceholder = () => {
  const category = categorySelect.value;
  nameInput.placeholder = PLACEHOLDERS[category] || "请输入名称";
};

const refreshSuggestions = () => {
  const category = categorySelect.value;
  const names = Array.from(new Set(SUGGESTIONS[category] || [])).sort();
  suggestionList.innerHTML = names
    .map((name) => `<option value="${name}"></option>`)
    .join("");
};

const autofillUnitPrice = () => {
  const name = nameInput.value.trim();
  if (!name) return;
  const category = categorySelect.value;
  const run = getCurrentRun();
  if (!run) return;
  const matched = run.items.find(
    (item) => item.category === category && item.name === name
  );
  if (
    matched &&
    (valueInput.value === "" || Number.isNaN(Number(valueInput.value)))
  ) {
    valueInput.value = matched.unitW;
  }
};

const renderHistory = () => {
  const query = (searchInput.value || "").trim().toLowerCase();
  const filtered = runs
    .slice()
    .sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0))
    .filter((run) => {
      if (!query) return true;
      const haystack = [
        run.gameId,
        run.uid,
        formatDateOnly(run.startedAt),
        formatDate(run.startedAt),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });

  historyList.innerHTML = "";

  if (filtered.length === 0) {
    historyList.innerHTML = `<div class="note">暂无记录</div>`;
    return;
  }

  filtered.forEach((run) => {
    const totals = getTotals(run.items || []);
    const baseProgress = (run.currentBalance || 0) - (run.startBalance || 0);
    const progress = baseProgress + totals.total;
    const remaining = Math.max((run.planned || 0) - progress, 0);
    const percent = run.planned > 0 ? clampPercent((progress / run.planned) * 100) : 0;
    const card = document.createElement("div");
    card.className = "history-card";
    card.innerHTML = `
      <div>
        <div class="history-title">${run.gameId || "未命名"} / ${run.uid || "-"}</div>
        <div class="history-meta">
          <span>日期：${formatDate(run.startedAt)}</span>
          <span>耗时：${formatDuration(run.durationSec || 0)}</span>
          <span>剩余：${formatW(remaining)}</span>
          <span>进度：${percent.toFixed(1)}%</span>
        </div>
      </div>
      <div class="history-actions">
        <button type="button" data-action="open" data-id="${run.id}">打开</button>
        <button type="button" data-action="delete" data-id="${run.id}">删除</button>
      </div>
    `;
    historyList.appendChild(card);
  });
};

const renderStats = () => {
  if (!statsGrid) return;
  const totalRuns = runs.length;
  const totalDuration = runs.reduce((acc, run) => acc + (run.durationSec || 0), 0);
  const totalLoot = runs.reduce(
    (acc, run) => acc + getTotals(run.items || []).total,
    0
  );
  const lastRunDate = runs.length
    ? formatShortDate(
        runs.slice().sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0))[0]
          .startedAt
      )
    : "-";

  statsGrid.innerHTML = `
    <div class="stat-card">
      总跑刀次数
      <strong>${totalRuns}</strong>
    </div>
    <div class="stat-card">
      累计耗时
      <strong>${formatDuration(totalDuration)}</strong>
    </div>
    <div class="stat-card">
      累计出货
      <strong>${formatW(totalLoot)}</strong>
    </div>
    <div class="stat-card">
      最近一次
      <strong>${lastRunDate}</strong>
    </div>
  `;
};

const loadRunToForm = (run) => {
  plannedInput.value = run.planned || "";
  currentInput.value = run.currentBalance || "";
  accountInput.value = run.startBalance || "";
  runMapInput.value = run.map || "";
  runModeInput.value = run.mode || "";
  runNoteInput.value = run.note || "";
  runIdLabel.textContent = `游戏ID：${run.gameId || "-"}`;
  runUidLabel.textContent = `UID：${run.uid || "-"}`;
  runBalanceLabel.textContent = `当前账号：${formatW(run.currentBalance || 0)}`;
  if (progressPercentLabel) {
    progressPercentLabel.textContent = `${(run.progressPercent || 0).toFixed(1)}%`;
  }
  if (progressFill) {
    progressFill.style.width = `${(run.progressPercent || 0).toFixed(1)}%`;
  }
  renderItems();
  updateTimerUI();
  if (run.timer.running) {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(tickTimer, 1000);
  }
};

const startTimer = () => {
  const run = getCurrentRun();
  if (!run || run.timer.running) return;

  run.timer.running = true;
  run.timer.startAt = Date.now() - run.timer.elapsedSec * 1000;
  saveRuns();
  updateTimerUI();
  tickTimer();
  timerInterval = setInterval(tickTimer, 1000);
};

const stopTimer = () => {
  const run = getCurrentRun();
  if (!run || !run.timer.running) return;

  run.timer.running = false;
  run.timer.elapsedSec = Math.floor((Date.now() - run.timer.startAt) / 1000);
  run.timer.startAt = null;
  run.durationSec = run.timer.elapsedSec;
  run.endedAt = Date.now();
  saveRuns();
  updateTimerUI();

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

const tickTimer = () => {
  const run = getCurrentRun();
  if (!run || !run.timer.running) return;
  run.timer.elapsedSec = Math.floor((Date.now() - run.timer.startAt) / 1000);
  timerDisplay.textContent = formatDuration(run.timer.elapsedSec);
  timerTotal.textContent = formatDuration(run.timer.elapsedSec);
  saveRuns();
};

const updateTimerUI = () => {
  const run = getCurrentRun();
  if (!run) {
    timerDisplay.textContent = "00:00:00";
    timerTotal.textContent = "00:00:00";
    return;
  }

  const elapsed = run.timer.elapsedSec || 0;
  timerDisplay.textContent = formatDuration(elapsed);
  timerTotal.textContent = formatDuration(elapsed);

  timerStartButton.disabled = run.timer.running;
  timerStopButton.disabled = !run.timer.running;
  timerStartButton.classList.toggle("active", run.timer.running);
  timerStopButton.classList.toggle("active", !run.timer.running);
};

navHistory.addEventListener("click", () => {
  goHome();
});

navStart.addEventListener("click", () => {
  setActiveView("start");
  gameIdInput.focus();
});

quickStartButton.addEventListener("click", () => {
  setActiveView("start");
  gameIdInput.focus();
});

startRunButton.addEventListener("click", () => {
  const gameId = (gameIdInput.value || "").trim();
  const uid = (uidInput.value || "").trim();
  if (!gameId || !uid) {
    alert("请先填写游戏ID和UID。");
    return;
  }
  const run = createRun(gameId, uid);
  runs.push(run);
  saveRuns();
  currentRunId = run.id;
  loadRunToForm(run);
  setActiveView("detail");
});

historyList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const id = button.dataset.id;
  const action = button.dataset.action;
  if (!id || !action) return;

  if (action === "open") {
    currentRunId = id;
    const run = getCurrentRun();
    if (run) {
      loadRunToForm(run);
      setActiveView("detail");
    }
    return;
  }

  if (action === "delete") {
    runs = runs.filter((run) => run.id !== id);
    if (currentRunId === id) currentRunId = null;
    saveRuns();
    renderHistory();
    renderStats();
  }
});

searchInput.addEventListener("input", renderHistory);
clearSearchButton.addEventListener("click", () => {
  searchInput.value = "";
  renderHistory();
});

timerStartButton.addEventListener("click", startTimer);
timerStopButton.addEventListener("click", stopTimer);
backHistoryButton.addEventListener("click", () => {
  goHome();
});

finishRunButton.addEventListener("click", () => {
  const run = getCurrentRun();
  if (!run) return;
  if (finishRunButton.disabled) return;

  stopTimer();
  const summary = [
    `游戏ID：${run.gameId || "-"}`,
    `UID：${run.uid || "-"}`,
    `本次用时：${formatDuration(run.durationSec || 0)}`,
    `地图/区域：${run.map || "-"}`,
    `队伍/模式：${run.mode || "-"}`,
    `备注：${run.note || "-"}`,
    `剩余：${formatW(run.remaining || 0)}`,
    `进度：${(run.progressPercent || 0).toFixed(1)}%`,
  ].join("\n");
  modalBody.textContent = summary;
  finishModal.classList.remove("hidden");
  saveRuns();
});

modalClose.addEventListener("click", () => {
  finishModal.classList.add("hidden");
  goHome();
});

modalConfirm.addEventListener("click", () => {
  finishModal.classList.add("hidden");
  goHome();
});

finishModal.addEventListener("click", (event) => {
  if (event.target === finishModal) {
    finishModal.classList.add("hidden");
    goHome();
  }
});

homeTitle.addEventListener("click", goHome);

addButton.addEventListener("click", () => {
  const run = getCurrentRun();
  if (!run) return;

  const name = nameInput.value.trim();
  const qty = Number(qtyInput.value);
  const unitW = Number(valueInput.value);
  const category = categorySelect.value;

  if (!name || Number.isNaN(qty) || qty <= 0 || Number.isNaN(unitW)) {
    alert("请填写有效的名称、数量和单价。");
    return;
  }

  const existing = run.items.find(
    (item) => item.category === category && item.name === name && item.unitW === unitW
  );
  if (existing) {
    existing.qty += qty;
    existing.totalW = existing.qty * existing.unitW;
  } else {
    run.items.push({
      category,
      name,
      qty,
      unitW,
      totalW: qty * unitW,
    });
  }

  saveRuns();
  renderItems();
  resetEntry();
});

tableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const index = Number(button.dataset.index);
  if (Number.isNaN(index)) return;

  const run = getCurrentRun();
  if (!run) return;

  run.items.splice(index, 1);
  saveRuns();
  renderItems();
});

plannedInput.addEventListener("input", updateRemaining);
currentInput.addEventListener("input", updateRemaining);
accountInput.addEventListener("input", updateRemaining);
categorySelect.addEventListener("change", () => {
  refreshSuggestions();
  updateNamePlaceholder();
  nameInput.value = "";
});
nameInput.addEventListener("blur", autofillUnitPrice);
nameInput.addEventListener("change", autofillUnitPrice);

runMapInput.addEventListener("input", () => {
  const run = getCurrentRun();
  if (!run) return;
  run.map = runMapInput.value.trim();
  saveRuns();
});

runModeInput.addEventListener("input", () => {
  const run = getCurrentRun();
  if (!run) return;
  run.mode = runModeInput.value.trim();
  saveRuns();
});

runNoteInput.addEventListener("input", () => {
  const run = getCurrentRun();
  if (!run) return;
  run.note = runNoteInput.value.trim();
  saveRuns();
});

exportButton.addEventListener("click", () => {
  const payload = JSON.stringify(runs, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "paodao_runs.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

importInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!Array.isArray(data)) throw new Error("invalid");
    runs = data;
    saveRuns();
    renderHistory();
    renderStats();
  } catch {
    alert("导入失败，请选择正确的 JSON 文件。");
  } finally {
    event.target.value = "";
  }
});

loadRuns();
renderHistory();
renderStats();
refreshSuggestions();
updateNamePlaceholder();
updateTimerUI();
setActiveView("history");
