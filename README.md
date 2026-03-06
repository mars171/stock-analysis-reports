# 股票分析报告展示平台

**版本：** v2.0  
**更新时间：** 2026-03-06  
**技术栈：** HTML5 + CSS3 + JavaScript (ES6+) + Bootstrap 5 + Marked.js + PDF.js

---

## 功能

### 报告展示
- **报告列表**：显示所有股票分析报告
- **报告详情**：查看单个报告的详细内容（Markdown 渲染、PDF 预览）
- **搜索功能**：按股票名称或代码搜索
- **响应式设计**：支持移动端和桌面端

### 技术特性
- **Markdown 渲染**：使用 Marked.js 将 Markdown 转换为 HTML
- **PDF 预览**：使用 PDF.js 在浏览器中预览 PDF 文件
- **响应式布局**：使用 Bootstrap 5 实现响应式设计
- **数据获取**：从 GitHub 仓库读取报告数据

---

## 文件说明

| 文件 | 说明 |
|------|------|
| index.html | 主页面（报告列表、详情查看、搜索）|
| styles.css | 样式文件（Bootstrap 5 + 自定义样式）|
| script.js | JavaScript 文件（交互逻辑、数据获取、Markdown 渲染）|
| README.md | 项目说明 |

---

## 使用说明

### 访问方式
1. **GitHub Pages**：https://mars171.github.io/stock-analysis-reports/
2. **本地访问**：直接打开 `index.html` 文件

### 功能使用
1. **查看报告列表**：页面加载后自动显示所有报告
2. **查看报告详情**：点击报告的"查看详情"按钮
3. **搜索报告**：在搜索框中输入股票名称或代码，按 Enter 键
4. **返回列表**：点击"返回列表"按钮返回报告列表

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

- **Frontend Dev**：Web 前端开发
- **Manager**：项目协调和汇总

---

## 许可证

MIT License

---

## 更新日志

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
