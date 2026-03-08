# 股票分析报告展示平台

**版本：** v3.0  
**更新时间：** 2026-03-08  
**技术栈：** HTML5 + CSS3 + JavaScript (ES6+) + Bootstrap 5 + Marked.js + PDF.js

---

## 功能

### 报告展示
- **报告列表**：显示所有股票分析报告
- **报告详情**：查看单个报告的详细内容（Markdown 渲染、PDF 预览）
- **搜索功能**：按股票名称或代码搜索
- **响应式设计**：支持移动端和桌面端

### 股票监控
- **监控列表**：显示所有正在监控的股票
- **股票详情**：显示股票代码、名称、市场、优先级、标签
- **市场标识**：区分上交所（SH）和深交所（SZ）
- **优先级分类**：高、中、低三个优先级
- **状态监控**：实时显示监控状态

### 每日汇总
- **汇总报告**：显示每日汇总报告
- **统计信息**：显示监控股票数量、高/中/低评分股票数量
- **历史记录**：查看历史每日汇总报告

### 技术特性
- **Markdown 渲染**：使用 Marked.js 将 Markdown 转换为 HTML
- **PDF 预览**：使用 PDF.js 在浏览器中预览 PDF 文件
- **响应式布局**：使用 Bootstrap 5 实现响应式设计
- **数据获取**：从 GitHub 仓库读取报告数据

---

## 目录结构

```
stock-analysis-reports/
├── index.html              # 主页面
├── styles.css              # 样式文件
├── script.js               # JavaScript 文件
├── watchlist.json          # 股票监控列表配置
├── README.md               # 项目说明
├── meta.json               # 项目元数据
├── archive/                # 归档目录
│   ├── 工业富联分析_601138/
│   ├── 千禾味业分析_603027/
│   ├── 10万投资计划_2026/
│   └── 昆仑万维分析_300418/
├── reports/                # 报告目录
│   ├── daily/              # 每日汇总报告
│   └── stocks/             # 个股报告
│       ├── 601138/
│       │   ├── latest/     # 最新报告
│       │   └── history/    # 历史报告
│       ├── 603027/
│       │   ├── latest/
│       │   └── history/
│       ├── 300418/
│       │   ├── latest/
│       │   └── history/
│       ├── 002594/
│       │   ├── latest/
│       │   └── history/
│       ├── 000100/
│       │   ├── latest/
│       │   └── history/
│       └── 600018/
│           ├── latest/
│           └── history/
├── skills/                 # 技能定义目录
├── tasks/                  # 任务计划目录
└── 团队创建/              # 项目初始化记录
```

---

## 使用说明

### 访问方式
1. **GitHub Pages**：https://mars171.github.io/stock-analysis-reports/
2. **本地访问**：直接打开 `index.html` 文件

### 功能使用
#### 股票监控
1. **查看监控列表**：页面加载后自动显示所有监控股票
2. **股票详情**：每张卡片显示股票代码、名称、市场、优先级、标签
3. **优先级标识**：
   - 🔴 高优先级
   - 🟡 中优先级
   - 🟢 低优先级
4. **市场标识**：
   - 🔵 上交所 (SH)
   - 🟢 深交所 (SZ)

#### 个股报告
1. **查看报告列表**：页面显示所有可用的股票分析报告
2. **查看报告详情**：点击报告的"查看详情"按钮
3. **搜索报告**：在搜索框中输入股票名称或代码，按 Enter 键
4. **返回列表**：点击"返回列表"按钮返回报告列表

#### 每日汇总
1. **查看汇总报告**：页面显示每日汇总报告列表
2. **统计信息**：查看每日监控股票数量和评分分布
3. **历史记录**：查看历史每日汇总报告

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| HTML | 5 | 语义化标记 |
| CSS | 3 | 响应式样式 |
| JavaScript | ES6+ | 交互逻辑和数据处理 |
| Bootstrap | 5 | 响应式 UI 框架 |
| Marked.js | 最新 | Markdown 渲染 |
| Highlight.js | 最新 | 代码高亮 |
| PDF.js | 最新 | PDF 预览 |
| GitHub API | v3 | 数据获取 |

---

## 开发说明

### 报告列表数据
当前使用模拟数据（`reportsData` 数组），实际数据将从 GitHub API 获取。

### Markdown 渲染
使用 `marked.parse()` 将 Markdown 转换为 HTML。

### PDF 预览
使用 `pdfjsLib.getDocument()` 加载 PDF 文件，使用 `pdfViewer.setDocument()` 渲染。

### GitHub API 集成
使用 `fetch()` 从 GitHub API 获取仓库和报告数据：
- 获取报告列表：`https://api.github.com/repos/mars171/stock-analysis-reports/contents`
- 获取报告详情：`https://api.github.com/repos/mars171/stock-analysis-reports/contents/路径`

---

## 后续优化

1. **数据获取**：从 GitHub API 实时获取报告列表
2. **分页功能**：实现报告列表的分页
3. **排序和筛选**：按日期、评分、建议排序和筛选
4. **用户偏好**：保存用户的搜索历史和偏好
5. **性能优化**：优化加载速度和渲染性能

---

## 开发团队

- **Manager**：项目管理和协调
- **Stock-Alpha**：技术面分析
- **Stock-Beta**：量化+情绪面分析
- **Data-Harvest**：数据收集
- **Frontend-Dev**：Web 前端开发

---

## 股票监控列表

当前监控的股票（共 6 只）：

| 股票代码 | 股票名称 | 市场 | 优先级 | 标签 |
|----------|----------|------|--------|------|
| 601138 | 工业富联 | 上交所 | 高 | 科技、制造业 |
| 603027 | 千禾味业 | 上交所 | 中 | 消费、食品 |
| 300418 | 昆仑万维 | 深交所 | 高 | 科技、AI、互联网 |
| 002594 | 京东集团 | 深交所 | 高 | 电商、科技 |
| 000100 | TCL科技 | 深交所 | 中 | 电子、显示 |
| 600018 | 上港集团 | 上交所 | 低 | 交通、物流 |

### 监控列表配置

`watchlist.json` 配置文件格式：

```json
{
  "version": "1.0",
  "updated_at": "2026-03-08T11:04:00Z",
  "stocks": [
    {
      "code": "601138",
      "name": "工业富联",
      "market": "SH",
      "status": "monitoring",
      "priority": "high",
      "tags": ["科技", "制造业"]
    }
  ],
  "summary": {
    "total": 6,
    "by_status": { "monitoring": 6 },
    "by_priority": { "high": 3, "medium": 2, "low": 1 },
    "by_market": { "SH": 3, "SZ": 3 }
  }
}
```

---

## 许可证

MIT License

---

## 更新日志

### v3.0 (2026-03-08)
- ✅ 重新组织目录结构
- ✅ 创建 `watchlist.json` 股票监控列表配置
- ✅ 添加股票监控列表功能
- ✅ 添加每日汇总报告功能
- ✅ 优化前端 UI 和交互
- ✅ 移动旧项目到归档目录
- ✅ 支持多股票监控（6 只）
- ✅ 支持优先级分类
- ✅ 支持市场标识
- ✅ 优化响应式设计

### v2.0 (2026-03-06)
- ✅ 创建前端 HTML + CSS + JavaScript 文件
- ✅ 实现报告列表展示
- ✅ 实现报告详情查看（Markdown 渲染、PDF 预览）
- ✅ 实现搜索功能
- ✅ 实现响应式设计
- ✅ 集成 Bootstrap 5
- ✅ 集成 Marked.js
- ✅ 集成 PDF.js
- ✅ 使用 GitHub API 获取数据（预留）

### v1.0 (2026-03-06)
- ✅ 项目初始化
- ✅ 创建 GitHub 仓库
- ✅ 创建项目文件夹结构
- ✅ 提交股票分析报告

---

**项目地址：** https://github.com/mars171/stock-analysis-reports  
**访问地址：** https://mars171.github.io/stock-analysis-reports/
