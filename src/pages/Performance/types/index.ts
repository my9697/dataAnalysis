type PeriodType = 'week' | 'month' | 'year';

interface ApiRequestData {
  id?: string;
  path: string;
  method: string;
  status: number;
  responseTime: number;
  size: string;
  statusText: string;
}

interface FormValues {
  dateRange?: [];
  status?: string;
  path?: string;
  apiCategory?: string;
}

interface ApiDetailInfo {
  path: string;
  method: string;
  avgResponseTime: string;
  successRate: string;
  totalCalls: number;
  status: 'normal' | 'warning' | 'error';
  responseTimeChange: {
    value: string;
    trend: 'increase' | 'decrease' | 'stable';
  };
  successRateChange: {
    value: string;
    trend: 'increase' | 'decrease' | 'stable';
  };
  totalCallsChange: {
    value: string;
    trend: 'increase' | 'decrease' | 'stable';
  };
}

export type TrendType = 'up' | 'down' | 'unchanged';
export type ChangeStatus = 'increase' | 'decrease' | 'stable';
export type PerformanceStatus = 'good' | 'normal' | 'poor';

export interface MetricsData {
  fcp: number;
  lcp: number;
  inp: number | null;
  ttfb: number;
}

export interface PerformanceMetrics {
  today: MetricsData;
  yesterday: MetricsData;
  diff: MetricsData;
  trend: {
    fcp: TrendType;
    lcp: TrendType;
    inp: TrendType;
    ttfb: TrendType;
  };
}

export interface CardProps {
  title: string;
  titleColor?: string;
  metricKey: 'fcp' | 'lcp' | 'inp' | 'ttfb';
  description: string;
  unit: string;
  value: number;
  performanceStatus: PerformanceStatus;
  changeRate: string;
  changeStatus: ChangeStatus;
  indicatorType: 'lower-better' | 'higher-better';
}

// 性能指标类型
export type MetricType = 'fcp' | 'lcp' | 'inp' | 'ttfb';

export type { PeriodType, ApiRequestData, FormValues, ApiDetailInfo };
