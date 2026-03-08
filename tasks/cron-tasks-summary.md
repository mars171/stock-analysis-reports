# 定时任务规划和创建总结

**任务：** 任务3 + 任务4
**完成时间：** 2026-03-08
**状态：** ✅ 已完成

---

## 📋 任务概览

### 任务3：定时任务规划

**目标：** 针对每日 10:00 单只股票报告生成、16:00 汇总报告生成两个定时任务，明确：
- 任务执行流程（触发条件、数据来源、报告生成逻辑、存储路径）
- 交付规范（报告格式、命名规则、存储位置）
- 团队协作分工（需协调的 worker 职责、你作为汇总人的提交要求）
- 输出每个定时任务的详细执行计划文档

**输出文档：**
- ✅ `tasks/cron-execution-plan.md` - 定时任务执行计划

### 任务4：定时任务创建

**目标：**
- 设计定时任务的技术实现方案（如使用 cron 表达式、任务调度工具等）
- 明确任务执行后的汇报内容（执行状态、报告数量、存储位置等）
- 输出定时任务的创建步骤及汇报模板

**输出文档：**
- ✅ `tasks/cron-daily-stock-report.json` - 每日单只股票报告 cron 配置
- ✅ `tasks/cron-daily-summary-report.json` - 每日汇总报告 cron 配置
- ✅ `tasks/cron-implementation-guide.md` - 定时任务实施指南

---

## 📦 交付物清单

### 1. 执行计划文档

**文件：** `tasks/cron-execution-plan.md`

**内容：**
- ✅ 定时任务1：每日单只股票报告生成（10:00 UTC）
  - 触发条件
  - 任务执行流程
  - 数据来源
  - 报告生成逻辑
  - 交付规范
  - 团队协作分工

- ✅ 定时任务2：每日汇总报告生成（16:00 UTC）
  - 触发条件
  - 任务执行流程
  - 数据来源
  - 报告生成逻辑
  - 交付规范
  - 团队协作分工

- ✅ 汇报模板
  - 单只股票报告生成完成汇报模板
  - 每日汇总报告生成完成汇报模板

### 2. Cron 配置文件

**文件1：** `tasks/cron-daily-stock-report.json`

**配置：**
```json
{
  "name": "每日单只股票报告生成",
  "schedule": {
    "kind": "cron",
    "expr": "0 10 * * *",
    "tz": "UTC"
  },
  "payload": {
    "kind": "systemEvent",
    "text": "📊 任务触发：每日单只股票报告生成..."
  },
  "sessionTarget": "main",
  "enabled": true
}
```

**文件2：** `tasks/cron-daily-summary-report.json`

**配置：**
```json
{
  "name": "每日汇总报告生成",
  "schedule": {
    "kind": "cron",
    "expr": "0 16 * * *",
    "tz": "UTC"
  },
  "payload": {
    "kind": "systemEvent",
    "text": "📊 任务触发：每日汇总报告生成..."
  },
  "sessionTarget": "main",
  "enabled": true
}
```

### 3. 实施指南

**文件：** `tasks/cron-implementation-guide.md`

**内容：**
- ✅ 前置条件
- ✅ 实施步骤（7 步）
- ✅ 任务管理命令
- ✅ Cron 表达式说明
- ✅ 监控和日志
- ✅ 故障排除
- ✅ 后续优化方向
- ✅ 验收标准

---

## 🎯 定时任务详情

### 任务1：每日单只股票报告生成

**执行时间：** 每天 10:00 UTC

**涉及股票：**
- 601138 工业富联
- 603027 千禾味业
- 300418 昆仑万维
- 002594 京东集团
- 000100 TCL科技
- 600018 上港集团

**执行流程：**
```
10:00 UTC 定时任务触发
    ↓
Manager 发送任务给 Data-Harvest
    ↓
Data-Harvest 收集所有监控股票的基础数据
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
    ↓
Manager 汇报任务完成
```

**报告存储路径：**
```
最新报告：reports/stocks/{code}/latest/
历史报告：reports/stocks/{code}/history/{YYYYMMDD}/
```

**命名规则：**
```
Markdown: {code}_分析报告_{YYYYMMDD}.md
PDF:     {code}_分析报告_{YYYYMMDD}.pdf
```

### 任务2：每日汇总报告生成

**执行时间：** 每天 16:00 UTC

**执行流程：**
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
    ├─ 评分分布
    ├─ 股票排名
    ├─ 投资建议汇总
    └─ 风险提示
    ↓
Manager 存储汇总报告
    ↓
Manager 汇报任务完成
```

**报告存储路径：**
```
reports/daily/每日汇总报告_{YYYYMMDD}.md
reports/daily/每日汇总报告_{YYYYMMDD}.pdf
```

---

## 👥 团队协作分工

### 定时任务1：每日单只股票报告生成

| Worker | 职责 | 交付物 | 汇报要求 |
|--------|------|--------|----------|
| Manager | 任务协调、汇总报告 | 最终报告（.md + .pdf） | 报告生成完成，汇报存储路径 |
| Data-Harvest | 收集所有股票数据 | 基础行情数据、技术指标数据 | 数据收集完成，汇报数据文件位置 |
| Stock-Alpha | 技术面分析（6 只股票） | 技术面分析报告 | 每只股票分析完成，汇报评分 |
| Stock-Beta | 量化+情绪面分析（6 只股票） | 量化情绪面分析报告 | 每只股票分析完成，汇报评分 |

### 定时任务2：每日汇总报告生成

| Worker | 职责 | 交付物 | 汇报要求 |
|--------|------|--------|----------|
| Manager | 生成汇总报告 | 汇总报告（.md + .pdf） | 汇总报告生成完成，汇报存储路径 |

---

## 📊 报告格式和命名规则

### 单只股票报告

**格式：**
- Markdown（.md）
- PDF（.pdf）

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

### 汇总报告

**格式：**
- Markdown（.md）
- PDF（.pdf）

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

---

## 🚀 下一步行动

### 立即行动

1. [ ] 审阅 `tasks/cron-execution-plan.md`
2. [ ] 审阅 `tasks/cron-implementation-guide.md`
3. [ ] 按照 `cron-implementation-guide.md` 创建两个定时任务
4. [ ] 测试定时任务触发

### 后续优化

1. [ ] 添加任务失败重试机制
2. [ ] 实现任务失败通知
3. [ ] 优化报告生成速度
4. [ ] 添加报告预览功能
5. [ ] 实现报告版本管理

---

## 📝 总结

### 完成的工作

✅ **任务3：定时任务规划**
- 详细定义了两个定时任务的执行流程
- 明确了数据来源和报告生成逻辑
- 定义了交付规范（格式、命名、存储）
- 明确了团队协作分工
- 制定了汇报模板

✅ **任务4：定时任务创建**
- 设计了技术实现方案（OpenClaw Cron）
- 创建了 cron 配置文件
- 编写了详细的实施指南
- 定义了汇报模板

### 交付的文档

1. `tasks/cron-execution-plan.md` - 定时任务执行计划（4249 字节）
2. `tasks/cron-daily-stock-report.json` - 任务1 配置文件（547 字节）
3. `tasks/cron-daily-summary-report.json` - 任务2 配置文件（414 字节）
4. `tasks/cron-implementation-guide.md` - 定时任务实施指南（4998 字节）

**总计：** 4 个文档/文件，共 10208 字节

---

**执行者：** Manager
**审核者：** Admin
**完成时间：** 2026-03-08
