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

export type { PeriodType, ApiRequestData, FormValues };
