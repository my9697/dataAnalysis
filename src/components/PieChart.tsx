import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface PieChartData {
  name: string;
  value: number;
}

interface PieChartProps {
  data: PieChartData[];
  title?: string;
  style: React.CSSProperties;
  colors: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, title, style, colors }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 初始化图表
    chartInstance.current = echarts.init(chartRef.current);

    const option = {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'middle',
        itemGap: 10,
        textStyle: {
          fontSize: 12,
        },
      },
      series: [
        {
          name: '操作系统分布',
          type: 'pie',
          radius: ['40%', '70%'], // 环形饼图
          center: ['60%', '50%'], // 图表中心位置，为左侧图例留出空间
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: data,
          itemStyle: {
            borderRadius: 4,
            borderColor: '#fff',
            borderWidth: 2,
          },
        },
      ],
      color: colors,
    };

    chartInstance.current.setOption(option);

    // 响应式
    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, [data, title, colors]);

  return <div ref={chartRef} style={style} />;
};

export default PieChart;
