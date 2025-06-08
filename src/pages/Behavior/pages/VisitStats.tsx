import React, { useState, useEffect } from 'react';
import { DatePicker, Select, Row, Col, Table } from 'antd';
import Card from '@/components/Card';
import LineChart from '@/components/LineChart';
import BarChart from '@/components/BarChart';
import type { CardProps, ChartSeries } from '@/types';

const VisitStats: React.FC = () => {
  // PV/UV 统计卡片数据
  const visitCards: CardProps[] = [
    {
      title: '页面访问量(PV)',
      value: '24,562',
      changeRate: '12.5%',
      changeStatus: 'increase',
      performanceStatus: 'good',
      description: '较上周',
    },
    {
      title: '独立访客数(UV)',
      value: '8,945',
      changeRate: '8.2%',
      changeStatus: 'increase',
      performanceStatus: 'good',
      description: '较上周',
    },
    {
      title: '新访客比例',
      value: '45.2%',
      changeRate: '2.1%',
      changeStatus: 'decrease',
      performanceStatus: 'normal',
      description: '较上周',
    },
  ];

  // 页面停留时长数据
  const pageStayData = [
    { path: '/home', avgTime: '4.5分钟', bounceRate: '35.2%', traffic: '15.3%' },
    { path: '/products', avgTime: '6.2分钟', bounceRate: '28.5%', traffic: '9.5%' },
    { path: '/blog', avgTime: '8.1分钟', bounceRate: '22.1%', traffic: '5.2%' },
    { path: '/about', avgTime: '2.8分钟', bounceRate: '45.6%', traffic: '5.2%' },
    { path: '/home2', avgTime: '4.5分钟', bounceRate: '35.2%', traffic: '15.3%' },
    { path: '/products2', avgTime: '6.2分钟', bounceRate: '28.5%', traffic: '9.5%' },
    { path: '/blog2', avgTime: '8.1分钟', bounceRate: '22.1%', traffic: '5.2%' },
    { path: '/about2', avgTime: '2.8分钟', bounceRate: '45.6%', traffic: '5.2%' },
  ];

  // 用户活跃度数据
  const userActivityData = [
    {
      type: '高度活跃用户',
      count: '3,245人',
      description: '(每周访问>5次)',
      color: 'text-green-600',
    },
    {
      type: '中度活跃用户',
      count: '5,678人',
      description: '(每周访问2-5次)',
      color: 'text-blue-600',
    },
    {
      type: '低度活跃用户',
      count: '2,890人',
      description: '(每周访问1次)',
      color: 'text-yellow-600',
    },
    { type: '沉睡用户', count: '1,234人', description: '(>30天未访问)', color: 'text-red-600' },
  ];

  // 热点页面访问量数据（柱状图用）
  const hotPagesChartData = [
    { page: '/home', visits: 800 },
    { page: '/about', visits: 950 },
    { page: '/blog', visits: 920 },
    { page: '/contact', visits: 890 },
    { page: '/products', visits: 1300 },
    { page: '/home2', visits: 900 },
    { page: '/about2', visits: 850 },
    { page: '/blog2', visits: 520 },
    { page: '/contact2', visits: 790 },
    { page: '/products2', visits: 1300 },
    { page: '/home3', visits: 800 },
    { page: '/about3', visits: 950 },
    { page: '/blog3', visits: 920 },
    { page: '/contact3', visits: 890 },
    { page: '/products3', visits: 1300 },
    { page: '/home4', visits: 800 },
    { page: '/about4', visits: 950 },
    { page: '/blog4', visits: 920 },
    { page: '/contact4', visits: 80 },
  ];

  // 用户访问趋势数据
  const visitTrendData = [
    { day: 'Mon', visits: 150 },
    { day: 'Tue', visits: 230 },
    { day: 'Wed', visits: 224 },
    { day: 'Thu', visits: 218 },
    { day: 'Fri', visits: 135 },
    { day: 'Sat', visits: 147 },
    { day: 'Sun', visits: 260 },
  ];

  // 用户来源分布数据（柱状图用）
  const sourceChartData = [
    { source: 'Direct', count: 315 },
    { source: 'Google', count: 450 },
    { source: 'Bing', count: 198 },
    { source: 'Social', count: 335 },
    { source: 'Others', count: 189 },
  ];

  // 页面停留时长表格列配置
  const stayTimeColumns = [
    {
      title: '页面路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '平均停留时长',
      dataIndex: 'avgTime',
      key: 'avgTime',
    },
    {
      title: '跳出率',
      dataIndex: 'bounceRate',
      key: 'bounceRate',
    },
    {
      title: '流量占比',
      dataIndex: 'traffic',
      key: 'traffic',
    },
  ];

  // 图表配置
  const hotPagesChartSeries: ChartSeries[] = [
    {
      name: '访问量',
      data: hotPagesChartData.map((item) => item.visits),
      color: '#5470C6',
      type: 'bar',
    },
  ];

  const visitTrendChartSeries: ChartSeries[] = [
    {
      name: '访问趋势',
      data: visitTrendData.map((item) => item.visits),
      color: '#91CC75',
      type: 'line',
      smooth: true,
      areaStyle: {},
    },
  ];

  const sourceChartSeries: ChartSeries[] = [
    {
      name: '来源分布',
      data: sourceChartData.map((item) => item.count),
      color: '#FAC858',
      type: 'bar',
    },
  ];

  const hotPagesXAxisData = hotPagesChartData.map((item) => item.page);
  const visitTrendXAxisData = visitTrendData.map((item) => item.day);
  const sourceXAxisData = sourceChartData.map((item) => item.source);

  return (
    <div className="px-3 pt-2 bg-gray-50">
      {/* 统计卡片 */}
      <Row gutter={16}>
        {visitCards.map((card, index) => (
          <Col span={8} key={index}>
            <Card {...card} />
          </Col>
        ))}
      </Row>
      {/* 页面停留时长分析 */}
      <Row gutter={16} className="mt-4">
        <Col span={12}>
          <div className="bg-whiterounded-lg shadow h-full px-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">页面停留时长分析</h3>
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                options={[
                  { label: '全部页面', value: 'all' },
                  { label: '主要页面', value: 'main' },
                  { label: '产品页面', value: 'product' },
                ]}
              />
            </div>
            <Table
              dataSource={pageStayData}
              columns={stayTimeColumns}
              pagination={false}
              rowKey="path"
              size="small"
            />
          </div>
        </Col>

        {/* 用户活跃度分析 */}
        <Col span={12}>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">用户活跃度分析</h3>
              <Select
                defaultValue="30days"
                style={{ width: 120 }}
                options={[
                  { label: '近30天', value: '30days' },
                  { label: '近60天', value: '60days' },
                ]}
              />
            </div>

            {/* 活跃度统计 */}
            <div className="mb-6">
              {userActivityData.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <div className="text-sm text-gray-600">{item.type}</div>
                    <div className="text-xs text-gray-400">{item.description}</div>
                  </div>
                  <div className={`text-lg font-bold ${item.color}`}>{item.count}</div>
                </div>
              ))}
            </div>

            {/* 留存率和流失率展示 */}
            <Row gutter={16}>
              <Col span={12}>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">85.2%</div>
                  <div className="text-sm text-gray-700">用户留存率</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600 mb-1">14.8%</div>
                  <div className="text-sm text-gray-700">用户流失率</div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* 三个图表区域 */}
      {/* 热点页面访问量 */}
      <Row gutter={16} className="mt-4">
        <Col span={24}>
          <div className="bg-white px-4 pt-4 rounded-lg shadow h-120 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">热点页面访问量</span>
            </div>
            <BarChart
              series={hotPagesChartSeries}
              xAxisData={hotPagesXAxisData}
              style={{ flex: 1 }}
              extraOptions={{
                grid: {
                  bottom: 50,
                  left: 10,
                  right: 10,
                  top: 30,
                  containLabel: true,
                },
                xAxis: {
                  axisLabel: {
                    interval: 0,
                    rotate: 45,
                    fontSize: 11,
                  },
                },
              }}
            />
          </div>
        </Col>
      </Row>

      {/* 用户访问趋势 */}
      <Row gutter={16} className="mt-4">
        <Col span={24}>
          <div className="bg-white px-4 pt-4 rounded-lg shadow h-120 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">用户访问趋势</span>
            </div>
            <LineChart
              series={visitTrendChartSeries}
              xAxisData={visitTrendXAxisData}
              style={{ flex: 1 }}
            />
          </div>
        </Col>
      </Row>

      {/* 用户来源分布 */}
      <Row gutter={16} className="mt-4">
        <Col span={24}>
          <div className="bg-white px-4 pt-4 rounded-lg shadow h-120 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">用户来源分布</span>
            </div>
            <BarChart
              series={sourceChartSeries}
              xAxisData={sourceXAxisData}
              style={{ flex: 1 }}
              extraOptions={{
                grid: {
                  bottom: 40,
                  left: 80,
                  right: 30,
                  top: 30,
                  containLabel: true,
                },
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default VisitStats;
