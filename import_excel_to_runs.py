import json
import re
from datetime import datetime

import pandas as pd

INPUT_XLSX = "input.xlsx"
OUTPUT_JSON = "paodao_import.json"

GROUPS = [
    {"id": 0, "uid": 1, "small": 2, "small_v": 3, "card": 4, "card_v": 5, "big": 6, "big_v": 7},
    {"id": 9, "uid": 10, "small": 11, "small_v": 12, "card": 13, "card_v": 14, "big": 15, "big_v": 16},
    {"id": 18, "uid": 19, "small": 20, "small_v": 21, "card": 22, "card_v": 23, "big": 24, "big_v": 25},
]

DATE_RE = re.compile(r"^\d{4}\.\d{1,2}\.\d{1,2}$")


def is_nan(value):
    return value is None or (isinstance(value, float) and pd.isna(value))


def clean_text(value):
    if is_nan(value):
        return ""
    return str(value).strip()


def parse_qty_name(name):
    name = clean_text(name)
    if not name:
        return "", 0
    m = re.match(r"^(.*)\*(\d+)$", name)
    if m:
        base = m.group(1).strip()
        qty = int(m.group(2))
        return base, qty
    return name, 1


def parse_number(value):
    if is_nan(value):
        return None
    try:
        return float(value)
    except Exception:
        return None


def parse_duration(value):
    text = clean_text(value)
    if not text:
        return 0
    # e.g. "六小时", "2.5小时", "八个小时"
    m = re.search(r"([0-9]+(?:\.[0-9]+)?)\s*小时", text)
    if m:
        hours = float(m.group(1))
        return int(hours * 3600)
    # Chinese numerals basic
    map_cn = {"一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9, "十": 10}
    for k, v in map_cn.items():
        if k in text:
            return v * 3600
    return 0


def should_ignore(name):
    name = clean_text(name)
    if not name:
        return True
    return any(
        key in name
        for key in [
            "总计",
            "红、卡总计",
            "订单金额",
            "余额",
            "结单",
            "现金",
            "剩余",
            "用时",
        ]
    )


def add_item(items, category, name, value):
    if should_ignore(name):
        return
    if value is None:
        return
    base, qty = parse_qty_name(name)
    if not base or qty <= 0:
        return
    unit = value / qty
    total = value
    for item in items:
        if item["category"] == category and item["name"] == base and abs(item["unitW"] - unit) < 1e-6:
            item["qty"] += qty
            item["totalW"] = item["qty"] * item["unitW"]
            return
    items.append(
        {
            "category": category,
            "name": base,
            "qty": qty,
            "unitW": unit,
            "totalW": total,
        }
    )


def parse_runs():
    df = pd.read_excel(INPUT_XLSX)
    runs = []
    current_date = None
    current_run = {0: None, 1: None, 2: None}

    for _, row in df.iterrows():
        date_cell = clean_text(row.iloc[0])
        if DATE_RE.match(date_cell):
            current_date = date_cell
            current_run = {0: None, 1: None, 2: None}
            continue

        for gi, group in enumerate(GROUPS):
            id_val = clean_text(row.iloc[group["id"]])
            uid_val = clean_text(row.iloc[group["uid"]])

            if id_val == "ID":
                continue

            if id_val == "订单金额：":
                run = current_run.get(gi)
                if not run:
                    continue
                pairs = [
                    (row.iloc[group["id"]], row.iloc[group["uid"]]),
                    (row.iloc[group["small"]], row.iloc[group["small_v"]]),
                    (row.iloc[group["card"]], row.iloc[group["card_v"]]),
                    (row.iloc[group["big"]], row.iloc[group["big_v"]]),
                ]
                for label, value in pairs:
                    label = clean_text(label)
                    num = parse_number(value)
                    if label == "订单金额：":
                        run["planned"] = num or 0
                    elif label == "余额":
                        run["startBalance"] = num or 0
                    elif label == "结单：":
                        run["currentBalance"] = num or 0
                continue

            if id_val and not should_ignore(id_val):
                started_at = None
                if current_date:
                    try:
                        started_at = int(datetime.strptime(current_date, "%Y.%m.%d").timestamp() * 1000)
                    except Exception:
                        started_at = None
                run = {
                    "id": f"import_{len(runs)+1}",
                    "gameId": id_val,
                    "uid": uid_val,
                    "startedAt": started_at,
                    "endedAt": None,
                    "durationSec": 0,
                    "timer": {"running": False, "startAt": None, "elapsedSec": 0},
                    "planned": 0,
                    "currentBalance": 0,
                    "startBalance": 0,
                    "items": [],
                    "map": "",
                    "mode": "",
                    "note": "导入自Excel",
                    "remaining": 0,
                    "progressPercent": 0,
                }
                runs.append(run)
                current_run[gi] = run

            run = current_run.get(gi)
            if not run:
                continue

            add_item(run["items"], "红色收集品", row.iloc[group["small"]], parse_number(row.iloc[group["small_v"]]))
            add_item(run["items"], "房卡", row.iloc[group["card"]], parse_number(row.iloc[group["card_v"]]))
            add_item(run["items"], "红色收集品", row.iloc[group["big"]], parse_number(row.iloc[group["big_v"]]))

            for label, value in [
                (row.iloc[group["small"]], row.iloc[group["small_v"]]),
                (row.iloc[group["card"]], row.iloc[group["card_v"]]),
                (row.iloc[group["big"]], row.iloc[group["big_v"]]),
            ]:
                label = clean_text(label)
                if label == "用时：":
                    run["durationSec"] = parse_duration(value)

    for run in runs:
        totals = sum(item["totalW"] for item in run["items"])
        progress = (run["currentBalance"] - run["startBalance"]) + totals
        planned = run["planned"] or 0
        remaining = max(planned - progress, 0) if planned else 0
        percent = (progress / planned * 100) if planned else 0
        run["remaining"] = remaining
        run["progressPercent"] = max(0, min(100, percent))
        if run["durationSec"]:
            run["endedAt"] = (run["startedAt"] or 0) + run["durationSec"] * 1000

    return runs


if __name__ == "__main__":
    data = parse_runs()
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Exported {len(data)} runs -> {OUTPUT_JSON}")
