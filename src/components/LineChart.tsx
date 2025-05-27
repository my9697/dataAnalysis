import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { LineChartProps } from '@/types';
/**
 * 可复用的折线图组件
 */
const LineChart: React.FC<LineChartProps> = ({
  series,
  xAxisData,
  style,
  yAxis,
  legendPosition = 'right',
  refreshKey,
  extraOptions,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // 初始化/更新图表
  const initChart = () => {
    if (!chartRef.current) return;

    // 如果已有实例，销毁
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    // 创建新实例
    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;

    // 处理系列数据
    const processedSeries = series.map((item) => ({
      name: item.name,
      type: item.type || 'line',
      data: item.data,
      smooth: item.smooth !== undefined ? item.smooth : true,
      ...(item.color ? { itemStyle: { color: item.color } } : {}),
    }));

    // 处理Y轴配置
    const defaultYAxis = {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
      },
    };

    // 从extraOptions中提取tooltip并与默认tooltip合并·
    const { tooltip: extraTooltip, ...restExtraOptions } = extraOptions || {};

    // 配置图表选项
    const option = {
      tooltip: {
        trigger: 'axis',
        ...(extraTooltip || {}),
      },
      legend: {
        data: series.map((item) => item.name),
        [legendPosition]: '10%',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
      },
      yAxis: yAxis || defaultYAxis,
      series: processedSeries,
      ...restExtraOptions,
    };

    // 设置图表选项
    chart.setOption(option);

    // 当图表所在容器大小发生变化时，重新调整图表大小
    chart.resize();
  };

  // 监听props变化和组件挂载/卸载
  useEffect(() => {
    // 延迟初始化，确保DOM已完全渲染
    const timer = setTimeout(() => {
      initChart();
    }, 0);

    // 窗口大小变化时重新调整图表大小
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      // 清理·
      clearTimeout(timer);
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [series, xAxisData, yAxis, legendPosition, refreshKey, extraOptions]);

  // 使用ResizeObserver监控容器大小变化
  useEffect(() => {
    if (!chartRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    });

    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return <div ref={chartRef} style={style} />;
};

export default LineChart;
