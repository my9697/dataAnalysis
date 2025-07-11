import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { LineChartProps } from '@/types';

/**
 * 专门的柱状图组件
 */
const BarChart: React.FC<LineChartProps> = ({
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

    // 处理系列数据 - 针对柱状图优化
    const processedSeries = series.map((item) => ({
      name: item.name,
      type: item.type || 'bar', // 默认为柱状图
      data: item.data,
      ...(item.color
        ? {
            itemStyle: {
              color: item.color,
            },
          }
        : {}),
    }));

    // 处理Y轴配置
    const defaultYAxis = {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
      },
    };

    // 处理X轴配置 - 针对柱状图优化
    const defaultXAxis = {
      type: 'category',
      boundaryGap: true, // 柱状图需要边距
      data: xAxisData,
      axisLabel: {
        interval: 0, // 显示所有标签
      },
      axisTick: {
        alignWithLabel: true,
      },
    };

    // 从extraOptions中提取配置
    const { tooltip: extraTooltip, xAxis: extraXAxis, ...restExtraOptions } = extraOptions || {};

    // 合并X轴配置
    const finalXAxis = {
      ...defaultXAxis,
      ...extraXAxis,
    };

    // 配置图表选项
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow', // 柱状图使用阴影指示器
        },
        formatter: function (params: any) {
          const param = params[0];
          return `${param.name}<br/>${param.seriesName}: ${param.value}`;
        },
        ...(extraTooltip || {}),
      },
      legend: {
        data: series.map((item) => item.name),
        [legendPosition]: '10%',
      },
      xAxis: finalXAxis,
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
      // 清理
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

export default BarChart;
