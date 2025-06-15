export const CHART_COLORS = {
  FCP: '#1890ff',
  LCP: '#52c41a',
  INP: '#faad14',
  TTFB: '#f5222d',
} as const;

export const TREND_TO_CHANGE_STATUS = {
  up: 'increase',
  down: 'decrease',
  unchanged: 'stable',
} as const;
