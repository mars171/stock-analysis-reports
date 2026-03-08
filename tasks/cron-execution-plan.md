# 定时任务执行计划

**版本：** v1.0
**创建时间：** 2026-03-08
**状态：** 待实施

---

## 📋 任务概述

本计划定义了两个定时任务的详细执行流程、交付规范和团队协作分工：

1. **每日单只股票报告生成**（10:00 UTC）
2. **每日汇总报告生成**（16:00 UTC）

---

## 📅 定时任务1：每日单只股票报告生成

### 触发条件

- **时间：** 每天 10:00 UTC
- **触发方式：** cron 任务

### 任务执行流程

```
10:00 UTC 定时任务触发
    ↓
Manager 发送任务给 Data-Harvest
    ↓
Data-Harvest 收集所有监控股票的基础数据
    ├─ 601138 工业富联
    ├─ 603027 千禾味业
    ├─ 300418 昆仑万维
    ├─ 002594 京东集团
    ├─ 000100 TCL科技
    └─ 600018 上港集团
    ↓
Manager 分配分析任务给 Stock-Alpha 和 Stock-Beta
    ↓
[并行执行]
    ├─ Stock-Alpha：技术面分析（每只股票）
    └─ Stock-Beta：量化+情绪面分析（每只股票）
    ↓
Manager 汇总分析结果，生成最终报告
    ↓
Manager 存储报告到对应目录
    └─ reports/stocks/{code}/latest/
    └─ reports/stocks/{code}/history/{date}/
    ↓
Manager 汇报任务完成
```

### 数据来源

| 数据类型 | 来源 Worker | 数据内容 |
|----------|-------------|----------|
| 基础行情数据 | Data-Harvest | 开盘价、收盘价、成交量、涨跌幅等 |
| 技术指标数据 | Data-Harvest | MA、MACD、KDJ、RSI 等 |
| 市场情绪数据 | Data-Harvest | 资金流向、舆情分析等 |

### 报告生成逻辑

**单只股票报告包含：**

1. **股票基本信息**
   - 股票代码、名称、市场
   - 当前价格、涨跌幅

2. **技术面分析**（Stock-Alpha）
   - 技术指标分析
   - 趋势判断
   - 评分（0-100）

3. **量化+情绪面分析**（Stock-Beta）
   - 量化指标分析
   - 市场情绪分析
   - 评分（0-100）

4. **综合评分**
   - 技术面评分 × 40% + 量化情绪面评分 × 60%
   - 投资建议

5. **历史对比**
   - 与昨日评分对比
   - 趋势变化

### 交付规范

**报告格式：**
- Markdown 格式（`.md`）
- PDF 格式（`.pdf`）

**命名规则：**
```
Markdown: {code}_分析报告_{YYYYMMDD}.md
PDF:     {code}_分析报告_{YYYYMMDD}.pdf
示例：   601138_分析报告_20260308.md
```

**存储位置：**
```
最新报告：reports/stocks/{code}/latest/
历史报告：reports/stocks/{code}/history/{YYYYMMDD}/
```

### 团队协作分工

| Worker | 职责 | 交付物 | 汇报要求 |
|--------|------|--------|----------|
| Manager | 任务协调、汇总报告 | 最终报告（.md + .pdf） | 报告生成完成，汇报存储路径 |
| Data-Harvest | 收集所有股票数据 | 基础行情数据、技术指标数据 | 数据收集完成，汇报数据文件位置 |
| Stock-Alpha | 技术面分析（6 只股票） | 技术面分析报告 | 每只股票分析完成，汇报评分 |
| Stock-Beta | 量化+情绪面分析（6 只股票） | 量化情绪面分析报告 | 每只股票分析完成，汇报评分 |

---

## 📅 定时任务2：每日汇总报告生成

### 触发条件

- **时间：** 每天 16:00 UTC
- **触发方式：** cron 任务

### 任务执行流程

```
16:00 UTC 定时任务触发
    ↓
Manager 检查当日单只股票报告是否全部生成
    ↓
[如果报告齐全]
    ↓
Manager 读取所有股票的报告数据
    ↓
Manager 生成汇总报告
    ├─ 监控股票总数
    ├─ 高评分股票数量（≥ 80 分）
    ├─ 中评分股票数量（60-79 分）
    ├─ 低评分股票数量（< 60 分）
    ├─ 各股票评分排名
    ├─ 投资建议汇总
    └─ 风险提示
    ↓
Manager 存储汇总报告
    └─ reports/daily/
    ↓
Manager 汇报任务完成
```

### 数据来源

- 当日生成的单只股票报告（`reports/stocks/*/latest/`）

### 报告生成逻辑

**汇总报告包含：**

1. **基本信息**
   - 报告日期
   - 监控股票数量

2. **评分分布**
   - 高评分股票（≥ 80 分）
   - 中评分股票（60-79 分）
   - 低评分股票（< 60 分）

3. **股票排名**
   - 按综合评分从高到低排序
   - 展示每只股票的评分和建议

4. **投资建议汇总**
   - 值得关注的股票
   - 需要警惕的股票

5. **风险提示**
   - 整体市场风险
   - 个别股票风险

### 交付规范

**报告格式：**
- Markdown 格式（`.md`）
- PDF 格式（`.pdf`）

**命名规则：**
```
Markdown: 每日汇总报告_{YYYYMMDD}.md
PDF:     每日汇总报告_{YYYYMMDD}.pdf
示例：   每日汇总报告_20260308.md
```

**存储位置：**
```
reports/daily/每日汇总报告_{YYYYMMDD}.md
reports/daily/每日汇总报告_{YYYYMMDD}.pdf
```

### 团队协作分工

| Worker | 职责 | 交付物 | 汇报要求 |
|--------|------|--------|----------|
| Manager | 生成汇总报告 | 汇总报告（.md + .pdf） | 汇总报告生成完成，汇报存储路径 |

---

## 📋 汇报模板

### 单只股票报告生成完成汇报模板

```
✅ 每日单只股票报告生成完成

📊 执行时间：{YYYY-MM-DD HH:MM:SS} UTC

📁 报告存储位置：

{股票代码} {股票名称}
- Markdown: reports/stocks/{code}/latest/{code}_分析报告_{YYYYMMDD}.md
- PDF: reports/stocks/{code}/latest/{code}_分析报告_{YYYYMMDD}.pdf
- 评分：{final_score}/100
- 建议：{recommendation}

[重复6只股票]

📈 评分汇总：
- 高评分（≥ 80 分）：{count} 只
- 中评分（60-79 分）：{count} 只
- 低评分（< 60 分）：{count} 只

🚀 下一任务：每日汇总报告生成（16:00 UTC）
```

### 每日汇总报告生成完成汇报模板

```
✅ 每日汇总报告生成完成

📊 执行时间：{YYYY-MM-DD HH:MM:SS} UTC

📁 汇总报告位置：
- Markdown: reports/daily/每日汇总报告_{YYYYMMDD}.md
- PDF: reports/daily/每日汇总报告_{YYYYMMDD}.pdf

📈 评分分布：
- 高评分（≥ 80 分）：{count} 只 ({percent}%)
- 中评分（60-79 分）：{count} 只 ({percent}%)
- 低评分（< 60 分）：{count} 只 ({percent}%)

🏆 股票排名（前3名）：
1. {code} {name} - {score} 分 - {recommendation}
2. {code} {name} - {score} 分 - {recommendation}
3. {code} {name} - {score} 分 - {recommendation}

⚠️ 风险提示：
{risk_warnings}

---
💾 所有报告已生成并存储完成！
```

---

## 📁 相关文件

- `tasks/cron-daily-stock-report.json` - 每日单只股票报告 cron 配置
- `tasks/cron-daily-summary-report.json` - 每日汇总报告 cron 配置
- `tasks/cron-implementation-guide.md` - 定时任务实施指南（待创建）

---

## 🔄 下一步行动

1. [ ] 审阅并确认本执行计划
2. [ ] 创建定时任务实施指南
3. [ ] 使用 `cron add` 命令创建两个定时任务
4. [ ] 测试定时任务触发
5. [ ] 验证报告生成流程

---

**创建者：** Manager
**审核者：** Admin
**更新日期：** 2026-03-08
