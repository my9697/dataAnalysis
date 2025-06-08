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

export type { PeriodType, ApiRequestData, FormValues, ApiDetailInfo };
