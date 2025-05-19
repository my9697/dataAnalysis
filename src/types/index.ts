import { ReactNode } from 'react';

interface CardProps {
  /** 卡片标题 */
  title?: ReactNode;
  /** 主要数据值 */
  value?: ReactNode;
  /** 描述文本 */
  description?: ReactNode;
  /** 变化率数值 */
  changeRate?: string | number;
  /** 变化状态：上升、下降或持平 */
  changeStatus?: 'increase' | 'decrease' | 'stable';
  /** 自定义类名 */
  className?: string;
}

// 图表系列类型
interface ChartSeries {
  name: string;
  data: number[];
  color?: string;
  smooth?: boolean;
  type?: 'line' | 'bar' | 'scatter' | 'pie' | 'radar';
  areaStyle?: any;
  stack?: string;
  yAxisIndex?: number;
}

interface LineChartProps {
  // 图表数据
  series: ChartSeries[];
  // X轴数据
  xAxisData: string[];
  // 图表标题
  title?: string;
  // 图表样式
  style?: React.CSSProperties;
  // Y轴配置
  yAxis?: any | any[];
  // 图例位置
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  // 刷新标识，当此值变化时重新渲染图表
  refreshKey?: any;
  // 额外的echarts选项
  extraOptions?: any;
}

export type { CardProps, ChartSeries, LineChartProps };
