# 定时任务实施指南

**版本：** v1.0
**创建时间：** 2026-03-08
**目标：** 创建并配置每日股票分析报告生成的定时任务

---

## 🎯 目标

创建两个定时任务：
1. **每日单只股票报告生成**（10:00 UTC）
2. **每日汇总报告生成**（16:00 UTC）

---

## 📋 前置条件

### 环境要求

- OpenClaw 已安装并运行
- Manager 会话可访问
- Git 仓库配置正确
- 所有 Worker 可用

### 文件准备

- ✅ `tasks/cron-daily-stock-report.json` - 任务1 配置文件
- ✅ `tasks/cron-daily-summary-report.json` - 任务2 配置文件
- ✅ `tasks/cron-execution-plan.md` - 执行计划文档

---

## 🚀 实施步骤

### 步骤 1：检查 Cron 服务状态

```bash
# 检查 Cron 服务是否可用
openclaw cron status
```

**预期输出：**
```
Cron scheduler: running
```

---

### 步骤 2：查看现有任务列表

```bash
# 查看所有已配置的定时任务
openclaw cron list
```

**预期输出：**
```
No jobs found
```
（或列出已有任务列表）

---

### 步骤 3：创建定时任务1 - 每日单只股票报告生成

**方式1：使用配置文件创建**

```bash
# 从配置文件创建任务
cat /root/hiclaw-fs/shared/projects/stock-analysis-reports/tasks/cron-daily-stock-report.json | jq -c | xargs -0 openclaw cron add --job
```

**方式2：直接使用 cron add 命令**

```bash
# 创建每日单只股票报告生成任务
openclaw cron add \
  --name "每日单只股票报告生成" \
  --schedule-kind "cron" \
  --schedule-expr "0 10 * * *" \
  --schedule-tz "UTC" \
  --session-target "main" \
  --payload-kind "systemEvent" \
  --payload-text "📊 任务触发：每日单只股票报告生成\n\n请按照以下流程执行：\n1. Data-Harvest 收集所有监控股票数据\n2. Stock-Alpha 进行技术面分析\n3. Stock-Beta 进行量化+情绪面分析\n4. Manager 汇总分析结果并生成报告\n\n监控股票：\n- 601138 工业富联\n- 603027 千禾味业\n- 300418 昆仑万维\n- 002594 京东集团\n- 000100 TCL科技\n- 600018 上港集团\n\n报告存储路径：\n- 最新：reports/stocks/{code}/latest/\n- 历史：reports/stocks/{code}/history/{YYYYMMDD}/" \
  --enabled
```

**预期输出：**
```
✅ Job created successfully
Job ID: <job-id>
```

---

### 步骤 4：创建定时任务2 - 每日汇总报告生成

**方式1：使用配置文件创建**

```bash
# 从配置文件创建任务
cat /root/hiclaw-fs/shared/projects/stock-analysis-reports/tasks/cron-daily-summary-report.json | jq -c | xargs -0 openclaw cron add --job
```

**方式2：直接使用 cron add 命令**

```bash
# 创建每日汇总报告生成任务
openclaw cron add \
  --name "每日汇总报告生成" \
  --schedule-kind "cron" \
  --schedule-expr "0 16 * * *" \
  --schedule-tz "UTC" \
  --session-target "main" \
  --payload-kind "systemEvent" \
  --payload-text "📊 任务触发：每日汇总报告生成\n\n请按照以下流程执行：\n1. 检查当日单只股票报告是否全部生成\n2. 读取所有股票的报告数据\n3. 生成汇总报告（评分分布、股票排名、投资建议、风险提示）\n4. 存储汇总报告\n\n报告存储路径：\n- reports/daily/每日汇总报告_{YYYYMMDD}.md\n- reports/daily/每日汇总报告_{YYYYMMDD}.pdf" \
  --enabled
```

**预期输出：**
```
✅ Job created successfully
Job ID: <job-id>
```

---

### 步骤 5：验证任务创建

```bash
# 查看所有已配置的定时任务
openclaw cron list
```

**预期输出：**
```
Job ID: <job-id-1>
Name: 每日单只股票报告生成
Schedule: 0 10 * * * (UTC)
Status: enabled

Job ID: <job-id-2>
Name: 每日汇总报告生成
Schedule: 0 16 * * * (UTC)
Status: enabled
```

---

### 步骤 6：测试定时任务（可选）

**手动触发任务1：**

```bash
# 手动触发每日单只股票报告生成任务
openclaw cron run --job-id <job-id-1>
```

**手动触发任务2：**

```bash
# 手动触发每日汇总报告生成任务
openclaw cron run --job-id <job-id-2>
```

**预期输出：**
```
✅ Job triggered successfully
```

---

### 步骤 7：监控任务执行

任务触发后，Manager 应该在 Matrix 房间中收到系统事件，并开始执行任务流程。

**监控方式：**
1. 查看矩阵房间的消息记录
2. 检查 Manager 是否接收到系统事件
3. 验证 Manager 是否按照流程执行任务
4. 确认报告是否正确生成和存储

---

## 📋 任务管理

### 查看任务历史

```bash
# 查看特定任务的执行历史
openclaw cron runs --job-id <job-id>
```

### 更新任务

```bash
# 更新任务配置（例如更改执行时间）
openclaw cron update \
  --job-id <job-id> \
  --schedule-expr "0 9 * * *"
```

### 禁用任务

```bash
# 禁用任务（不删除）
openclaw cron update \
  --job-id <job-id> \
  --enabled false
```

### 启用任务

```bash
# 启用已禁用的任务
openclaw cron update \
  --job-id <job-id> \
  --enabled true
```

### 删除任务

```bash
# 删除任务（谨慎使用）
openclaw cron remove --job-id <job-id>
```

---

## 🔄 Cron 表达式说明

### 基本格式

```
* * * * *
│ │ │ │ │
│ │ │ │ └─ 星期几 (0-6, 0=周日)
│ │ │ └─── 月份 (1-12)
│ │ └───── 日期 (1-31)
│ └─────── 小时 (0-23)
└───────── 分钟 (0-59)
```

### 示例

| Cron 表达式 | 说明 |
|-------------|------|
| `0 10 * * *` | 每天 10:00 执行 |
| `0 16 * * *` | 每天 16:00 执行 |
| `0 9 * * 1-5` | 周一到周五 9:00 执行 |
| `0 */2 * * *` | 每 2 小时执行一次 |
| `0 0 * * 0` | 每周日 0:00 执行 |

---

## 📊 监控和日志

### 查看任务执行日志

```bash
# 查看任务的执行历史
openclaw cron runs --job-id <job-id>
```

### 预期日志格式

```
Job ID: <job-id>
Run ID: <run-id>
Status: completed
Started at: 2026-03-08 10:00:00 UTC
Completed at: 2026-03-08 10:15:00 UTC
Duration: 15m 0s
```

---

## ⚠️ 故障排除

### 问题 1：任务未触发

**可能原因：**
- Cron 服务未运行
- 任务未启用
- 系统时间不正确

**解决方案：**
```bash
# 检查 Cron 服务状态
openclaw cron status

# 检查任务是否启用
openclaw cron list

# 检查系统时间
date
```

### 问题 2：任务执行失败

**可能原因：**
- Manager 会话不可用
- Worker 会话不可用
- 数据源访问失败
- 文件系统权限问题

**解决方案：**
1. 查看 Manager 会话状态
2. 检查 Worker 会话状态
3. 验证数据源连接
4. 检查文件系统权限

---

## 📝 后续优化

### 优化方向

1. **错误处理**
   - 添加任务失败重试机制
   - 实现任务失败通知

2. **性能优化**
   - 优化报告生成速度
   - 并行化数据分析流程

3. **功能增强**
   - 添加报告预览功能
   - 实现报告版本管理
   - 支持自定义报告模板

4. **监控增强**
   - 添加任务执行时间监控
   - 实现报告质量评估
   - 添加异常检测机制

---

## 📚 相关文档

- `tasks/cron-execution-plan.md` - 定时任务执行计划
- `tasks/cron-daily-stock-report.json` - 任务1 配置文件
- `tasks/cron-daily-summary-report.json` - 任务2 配置文件

---

## ✅ 验收标准

- [ ] 两个定时任务已成功创建
- [ ] 任务配置正确（时间、session target、payload）
- [ ] 任务列表中可以看到两个任务
- [ ] 手动触发任务可以正常执行
- [ ] 报告可以正常生成和存储
- [ ] Manager 可以正常汇报任务完成状态

---

**创建者：** Manager
**审核者：** Admin
**更新日期：** 2026-03-08
