import React, { useState, useMemo } from 'react';
import Card from '@/components/Card';
import LineChart from '@/components/LineChart';
import { CardProps } from '@/types';
import { CHART_COLORS } from '@/common/constants';
import type { PeriodType } from '@/pages/Performance/types';
import { Segmented } from 'antd';

const PerformanceOverview: React.FC = () => {
  // 趋势图时间周期
  const [period, setPeriod] = useState<PeriodType>('week');

  // 性能指标卡片数
  const performanceCards: CardProps[] = [
    {
      title: 'FCP (首次内容绘制)',
      titleColor: CHART_COLORS.FCP,
      value: '1.2s',
      performanceStatus: 'poor',
      description: '较昨日上升',
      changeRate: '8.5%',
      changeStatus: 'increase',
      indicatorType: 'lower-better', // 耗时越低越好
    },
    {
      title: 'LCP (最大内容绘制)',
      titleColor: CHART_COLORS.LCP,
      value: '2.4s',
      performanceStatus: 'normal',
      description: '较昨日不变',
      changeRate: '5.2%',
      changeStatus: 'stable',
      indicatorType: 'lower-better', // 耗时越低越好
    },
    {
      title: 'TTI (可交互时间)',
      titleColor: CHART_COLORS.TTI,
      value: '2.4s',
      performanceStatus: 'good',
      description: '较昨日下降',
      changeRate: '5.2%',
      changeStatus: 'decrease',
      indicatorType: 'lower-better', // 耗时越低越好
    },
    {
      title: 'INP (交互响应延迟)',
      titleColor: CHART_COLORS.INP,
      value: '2.4s',
      performanceStatus: 'good',
      description: '较昨日下降',
      changeRate: '5.2%',
      changeStatus: 'increase',
      indicatorType: 'lower-better', // 耗时越低越好
    },
  ];

  // 模拟不同周期的日期数据
  const dateLabels = useMemo(() => {
    const now = new Date();
    const labels = [];

    if (period === 'week') {
      // 最近7天的日期
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
      }
    } else if (period === 'month') {
      // 本月的周数（一个月通常有4周）
      for (let i = 1; i <= 4; i++) {
        labels.push(`第${i}周`);
      }
    } else if (period === 'year') {
      // 一年12个月
      const monthNames = [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ];
      labels.push(...monthNames);
    }

    return labels;
  }, [period]);

  // 模拟性能数据，恢复合理数值范围
  const generatePerformanceData = (min: number, max: number) => {
    const length = period === 'week' ? 7 : period === 'month' ? 4 : 12;
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min) + min));
  };

  // 图表数据 - 根据实际性能指标典型值设置合理范围
  const chartData = useMemo(() => {
    return [
      {
        name: 'FCP',
        data: generatePerformanceData(800, 1800),
        color: CHART_COLORS.FCP,
      },
      {
        name: 'LCP',
        data: generatePerformanceData(2000, 3500),
        color: CHART_COLORS.LCP,
      },
      {
        name: 'TTI',
        data: generatePerformanceData(3000, 4500),
        color: CHART_COLORS.TTI,
      },
      {
        name: 'INP',
        data: generatePerformanceData(150, 250),
        color: CHART_COLORS.INP,
      },
    ];
  }, [period]);

  // 处理周期变更
  const handlePeriodChange = (value: string | number) => {
    setPeriod(value as PeriodType);
  };

  return (
    <div className="flex flex-col flex-1 p-4">
      {/* 性能指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {performanceCards.map((cardProps, index) => (
          <Card key={index} {...cardProps} />
        ))}
      </div>

      {/* 性能指标趋势 */}
      <div className="bg-white p-4 rounded shadow flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">性能指标趋势</h2>
          <Segmented
            options={[
              { label: '周', value: 'week' },
              { label: '月', value: 'month' },
              { label: '年', value: 'year' },
            ]}
            value={period}
            onChange={handlePeriodChange}
          />
        </div>
        <LineChart
          series={chartData}
          xAxisData={dateLabels}
          style={{ flex: 1 }}
          yAxis={{
            type: 'value',
            name: '时间(ms)',
            axisLabel: {
              formatter: '{value}ms',
            },
          }}
          refreshKey={period} // 当周期变化时刷新图表
          extraOptions={{
            grid: {
              left: '3%', // 左侧留出少量边距
              right: '3%', // 右侧留出少量边距，尤其是有legend时
              top: '8%', // 顶部留出少量空间
              bottom: '2%', // 底部留出少量空间给x轴标签
              containLabel: true, // 确保坐标轴标签被包含
            },
            dataZoom: [
              {
                type: 'inside',
                start: 0,
                end: 100,
              },
            ],
            tooltip: {
              formatter: function (params: any) {
                let result = '';
                for (let i = 0; i < params.length; i++) {
                  const param = params[i];
                  result += param.marker + ' ' + param.seriesName + ': ' + param.value + 'ms<br/>';
                }
                return result;
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PerformanceOverview;
