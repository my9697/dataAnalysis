import React, { useState } from 'react';
import { Row, Col } from 'antd';
import Card from '@/components/Card';
import LineChart from '@/components/LineChart';
import PieChart from '@/components/PieChart';
import BarChart from '@/components/BarChart';
import type { CardProps } from '@/types';

const Overview: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // 统计卡片数据
  const statsCards: CardProps[] = [
    {
      title: '今日异常总数',
      value: '128',
      changeRate: '12.5%',
      changeStatus: 'increase',
      performanceStatus: 'poor',
      description: '较昨日',
    },
    {
      title: '影响用户数',
      value: '45',
      changeRate: '8.3%',
      changeStatus: 'increase',
      performanceStatus: 'normal',
      description: '较昨日',
    },
    {
      title: '昨日未解决异常',
      value: '6',
      changeRate: '2.5%',
      changeStatus: 'decrease',
      performanceStatus: 'good',
      description: '较昨日',
    },
    {
      title: '昨日异常解决率',
      value: '78.5%',
      changeRate: '3.2%',
      changeStatus: 'increase',
      performanceStatus: 'good',
      description: '较昨日',
    },
  ];

  // 错误趋势数据
  const trendData = [
    { time: '5/3', jsError: 29, apiError: 18, resourceError: 8 },
    { time: '5/4', jsError: 25, apiError: 15, resourceError: 5 },
    { time: '5/5', jsError: 28, apiError: 12, resourceError: 8 },
    { time: '5/6', jsError: 32, apiError: 10, resourceError: 7 },
    { time: '5/7', jsError: 42, apiError: 15, resourceError: 5 },
    { time: '5/8', jsError: 35, apiError: 16, resourceError: 10 },
    { time: '5/9', jsError: 31, apiError: 14, resourceError: 11 },
    { time: '5/10', jsError: 28, apiError: 12, resourceError: 7 },
  ];

  // 浏览器错误分布数据
  const browserErrorData = [
    { name: 'Chrome', value: 45 },
    { name: 'Firefox', value: 28 },
    { name: 'Safari', value: 22 },
    { name: 'Edge', value: 18 },
    { name: 'IE', value: 8 },
    { name: 'Others', value: 7 },
  ];

  // 页面错误分布数据
  const pageErrorData = [
    { name: '/login', value: 45 },
    { name: '/checkout', value: 38 },
    { name: '/user/dashboard', value: 32 },
    { name: '/products', value: 28 },
    { name: '/home', value: 25 },
  ];

  // 颜色配置
  const browserColors = ['#4285f4', '#34a853', '#fbbc04', '#ea4335', '#9aa0a6', '#ff6d01'];
  const pageColors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'];

  return (
    <div className="bg-gray-50 px-3 pt-2">
      {/* 统计卡片 */}
      <Row gutter={16}>
        {statsCards.map((card, index) => (
          <Col span={6} key={index}>
            <Card {...card} />
          </Col>
        ))}
      </Row>

      {/* 图表区域 */}
      {/* 错误趋势 */}
      <Row gutter={16} className="mt-4">
        <Col span={24}>
          <div className="bg-white p-4 rounded-lg shadow h-100 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">错误趋势</span>
            </div>
            <LineChart
              series={[
                {
                  name: 'JavaScript错误',
                  data: trendData.map((item) => item.jsError),
                  color: '#ff4d4f',
                  type: 'line',
                },
                {
                  name: 'API错误',
                  data: trendData.map((item) => item.apiError),
                  color: '#faad14',
                  type: 'line',
                },
                {
                  name: '资源加载错误',
                  data: trendData.map((item) => item.resourceError),
                  color: '#1890ff',
                  type: 'line',
                },
              ]}
              xAxisData={trendData.map((item) => item.time)}
              style={{ flex: 1 }}
            />
          </div>
        </Col>
      </Row>

      {/* 浏览器错误分布和页面错误分布 */}
      <Row gutter={16} className="mt-4">
        {/* 浏览器错误分布 */}
        <Col span={12}>
          <div className="bg-white px-4 pt-4 rounded-lg shadow h-100 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">浏览器错误分布</span>
            </div>
            <PieChart data={browserErrorData} colors={browserColors} style={{ flex: 1 }} />
          </div>
        </Col>

        {/* 页面错误分布 */}
        <Col span={12}>
          <div className="bg-white px-4 pt-4 pb-4 rounded-lg shadow h-100 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">页面错误分布</span>
            </div>
            <BarChart
              series={[
                {
                  name: '错误数量',
                  data: pageErrorData.map((item) => item.value),
                  color: pageColors[0],
                  type: 'bar',
                },
              ]}
              xAxisData={pageErrorData.map((item) => item.name)}
              style={{ flex: 1 }}
              extraOptions={{
                xAxis: {
                  axisLabel: {
                    rotate: 45,
                    interval: 0,
                  },
                },
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
