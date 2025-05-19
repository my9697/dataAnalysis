enum ROUTER_PATH {
  PERFORMANCE = '/performance',
  PERFORMANCE_OVERVIEW = '/performance/overview',
  PERFORMANCE_NETWORK = '/performance/network',
  PERFORMANCE_RESOURCE = '/performance/resource',
  BEHAVIOR = '/behavior',
  ERROR_ANALYSIS = '/errorAnalysis',
}

// 静态样式映射表
const CHANGE_STYLES = {
  increase: { color: 'text-green-500', arrow: '↑' },
  decrease: { color: 'text-red-500', arrow: '↓' },
  stable: { color: 'text-gray-500', arrow: '—' },
};

// 定义图表颜色常量
const CHART_COLORS = {
  FCP: '#5470C6', // 蓝色
  LCP: '#91CC75', // 绿色
  TTI: '#FAC858', // 黄色
  INP: '#EE6666', // 红色
};

export { ROUTER_PATH, CHANGE_STYLES, CHART_COLORS };
