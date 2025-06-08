enum ROUTER_PATH {
  PERFORMANCE = '/performance',
  PERFORMANCE_OVERVIEW = '/performance/overview',
  PERFORMANCE_NETWORK = '/performance/network',
  PERFORMANCE_RESOURCE = '/performance/resource',
  BEHAVIOR = '/behavior',
  BEHAVIOR_VISIT_STATS = '/behavior/visit-stats',
  BEHAVIOR_DEVICE_PARAMS = '/behavior/device-params',
  ERROR_ANALYSIS = '/errorAnalysis',
  ERROR_OVERVIEW = '/errorAnalysis/overview',
  ERROR_LIST = '/errorAnalysis/error-list',
}

// 定义Card组件状态文本
const STATUS_TEXT = {
  good: '(良好)',
  normal: '(一般)',
  poor: '(较差)',
} as const;

// 定义Card组件状态背景颜色
const STATUS_BG_COLOR = {
  good: 'bg-green-500',
  normal: 'bg-yellow-500',
  poor: 'bg-red-500',
} as const;

// 定义Card组件状态文本颜色
const STATUS_COLOR = {
  good: 'text-green-500',
  normal: 'text-yellow-500',
  poor: 'text-red-500',
} as const;

// 定义Card组件状态箭头颜色
const STATUS_ARROW_COLOR = {
  increase: 'text-green-500',
  decrease: 'text-red-500',
  stable: 'text-yellow-500',
} as const;

// 定义Card组件状态箭头
const STATUS_ARROW = {
  increase: '↑',
  decrease: '↓',
  stable: '—',
} as const;

// 定义图表颜色常量
const CHART_COLORS = {
  FCP: '#5470C6', // 蓝色
  LCP: '#91CC75', // 绿色
  TTI: '#FAC858', // 黄色
  INP: '#EE6666', // 红色
};

const API_CATEGORY = [
  { label: '全部接口', value: -1 },
  { label: '用户接口', value: 1 },
  { label: '商品接口', value: 2 },
  { label: '订单接口', value: 3 },
];

const STATUS_FILTER = [
  { label: '全部', value: -1 },
  { label: '正常', value: 1 },
  { label: '告警', value: 2 },
];

// HTTP方法颜色配置
const HTTP_METHOD_CONFIG = {
  GET: { color: 'blue', text: 'GET' },
  POST: { color: 'green', text: 'POST' },
  PUT: { color: 'orange', text: 'PUT' },
  DELETE: { color: 'red', text: 'DELETE' },
  PATCH: { color: 'purple', text: 'PATCH' },
  HEAD: { color: 'cyan', text: 'HEAD' },
  OPTIONS: { color: 'geekblue', text: 'OPTIONS' },
} as const;

export {
  ROUTER_PATH,
  CHART_COLORS,
  STATUS_COLOR,
  STATUS_BG_COLOR,
  STATUS_TEXT,
  STATUS_ARROW,
  STATUS_ARROW_COLOR,
  API_CATEGORY,
  STATUS_FILTER,
  HTTP_METHOD_CONFIG,
};
