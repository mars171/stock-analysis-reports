// 股票分析报告前端 JavaScript 文件

// 全局变量
const GITHUB_API_BASE = 'https://api.github.com/repos/mars171/stock-analysis-reports';
const REPORTS_PATH = '/reports';

// 报告列表数据（模拟数据，稍后将从 GitHub API 获取）
const reportsData = [
  {
    id: 'industrial-finance-601138',
    name: '工业富联',
    code: '601138',
    date: '2026-03-06',
    score: 47.6,
    recommendation: '强烈建议观望',
    summary: '工业富联股票投资分析'
  },
  {
    id: 'qianhe-weiye-603027',
    name: '千禾味业',
    code: '603027',
    date: '2026-03-06',
    score: 54.6,
    recommendation: '谨慎乐观',
    summary: '千禾味业股票投资分析'
  },
  {
    id: 'kunlun-wanwei-300418',
    name: '昆仑万维',
    code: '300418',
    date: '2026-03-06',
    score: 63.125,
    recommendation: '谨慎持有',
    summary: '昆仑万维股票投资分析'
  },
  {
    id: '10w-investment-plan-2026',
    name: '10万元投资计划',
    code: 'N/A',
    date: '2026-03-06',
    score: 67.5,
    recommendation: '稳健型',
    summary: '10万元人民币1年期投资计划'
  }
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  console.log('页面加载完成');
  
  // 显示加载动画
  document.getElementById('reportList').innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  `;
  
  // 模拟延迟（1秒）后显示报告列表
  setTimeout(function() {
    displayReports(reportsData);
  }, 1000);
});

// 搜索报告
function searchReports() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredReports = reportsData.filter(report => 
    report.name.toLowerCase().includes(searchInput) ||
    report.code.toLowerCase().includes(searchInput)
  );
  
  displayReports(filteredReports);
}

// 显示报告列表
function displayReports(reports) {
  const reportListElement = document.getElementById('reportList');
  
  if (reports.length === 0) {
    reportListElement.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-search fa-3x empty-state-icon"></i>
        <p class="empty-state-text">未找到匹配的报告</p>
      </div>
    `;
    return;
  }
  
  let html = '';
  
  reports.forEach(report => {
    // 确定评分等级样式
    let scoreBadgeClass = 'bg-secondary';
    let scoreText = report.recommendation;
    
    if (report.score >= 80) {
      scoreBadgeClass = 'badge-danger';
      scoreText = '高评分';
    } else if (report.score >= 60) {
      scoreBadgeClass = 'badge-warning';
      scoreText = '中评分';
    } else if (report.score >= 40) {
      scoreBadgeClass = 'badge-info';
      scoreText = '低评分';
    } else {
      scoreBadgeClass = 'badge-success';
      scoreText = '低评分';
    }
    
    html += `
      <div class="card mb-3">
        <div class="card-body">
          <h3 class="card-title">${report.name} <span class="badge ${scoreBadgeClass}">${scoreText}</span></h3>
          <p class="card-text"><strong>股票代码：</strong> ${report.code}</p>
          <p class="card-text"><strong>日期：</strong> ${report.date}</p>
          <p class="card-text"><strong>评分：</strong> ${report.score}/100</p>
          <p class="card-text"><strong>建议：</strong> ${report.recommendation}</p>
          <p class="card-text text-muted">${report.summary}</p>
          <button class="btn btn-primary mt-2" onclick="loadReportDetail('${report.id}')">
            <i class="fas fa-eye"></i> 查看详情
          </button>
        </div>
      </div>
    `;
  });
  
  reportListElement.innerHTML = html;
}

// 加载报告详情
function loadReportDetail(reportId) {
  const report = reportsData.find(r => r.id === reportId);
  
  if (!report) {
    alert('报告未找到！');
    return;
  }
  
  // 隐藏报告列表，显示报告详情
  document.getElementById('reports').style.display = 'none';
  document.getElementById('reportDetail').style.display = 'block';
  
  // 设置报告标题
  document.getElementById('reportTitle').innerText = report.name;
  
  // 显示加载动画
  document.getElementById('reportContent').innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  `;
  
  // 模拟从 GitHub 加载报告内容（1秒）
  setTimeout(function() {
    loadReportContentFromGitHub(report.id);
  }, 1000);
}

// 从 GitHub 加载报告内容
async function loadReportContentFromGitHub(reportId) {
  try {
    // 尝试加载 Markdown 文件
    const markdownUrl = `${GITHUB_API_BASE}${REPORTS_PATH}/${reportId}/报告/${reportId}.md`;
    const response = await fetch(markdownUrl);
    
    if (response.ok) {
      const markdown = await response.text();
      
      // 将 Markdown 渲染为 HTML
      const htmlContent = marked.parse(markdown);
      
      // 显示报告内容
      document.getElementById('reportContent').innerHTML = htmlContent;
      
      // 尝试加载 PDF 文件
      const pdfUrl = `${GITHUB_API_BASE}${REPORTS_PATH}/${reportId}/报告/${reportId}.pdf`;
      document.getElementById('reportContent').innerHTML += `
        <div class="mt-4">
          <a href="${pdfUrl}" target="_blank" class="btn btn-success">
            <i class="fas fa-file-pdf"></i> 查看 PDF 报告
          </a>
        </div>
      `;
    } else {
      throw new Error('Failed to load report from GitHub');
    }
  } catch (error) {
    console.error('Error loading report:', error);
    document.getElementById('reportContent').innerHTML = `
      <div class="alert alert-danger">
        <strong>加载失败！</strong> 无法从 GitHub 加载报告内容。
        <p class="mb-0">${error.message}</p>
        <p class="mb-0">错误详情：${error.stack}</p>
      </div>
    `;
  }
}

// 返回报告列表
function backToReports() {
  // 隐藏报告详情，显示报告列表
  document.getElementById('reports').style.display = 'block';
  document.getElementById('reportDetail').style.display = 'none';
}

// 从 GitHub 获取报告列表（预留功能）
async function fetchReportsFromGitHub() {
  try {
    const response = await fetch(`${GITHUB_API_BASE}${REPORTS_PATH}`);
    const data = await response.json();
    
    // 解析报告列表
    const reports = [];
    
    data.forEach(item => {
      if (item.type === 'dir' && item.name !== 'reports') {
        reports.push({
          id: item.name,
          name: item.name,
          date: item.name.split('_').pop().replace(/-/g, '.'),
          summary: `${item.name} 股票投资分析`
        });
      }
    });
    
    // 按日期排序（降序）
    reports.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 更新报告列表
    reportsData = reports;
    displayReports(reports);
  } catch (error) {
    console.error('Error fetching reports from GitHub:', error);
  }
}

// 导航事件监听
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    // 移除所有 active 类
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    // 添加 active 类到当前链接
    this.classList.add('active');
    
    // 处理导航
    if (this.getAttribute('href') === '#reports') {
      backToReports();
    } else if (this.getAttribute('href') === '#about') {
      // 显示关于页面（待实现）
    }
  });
});

// 搜索框事件监听
document.getElementById('searchInput').addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    searchReports();
  }
});

// 返回按钮事件监听
document.getElementById('backButton')?.addEventListener('click', function() {
  backToReports();
});
