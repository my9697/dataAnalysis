import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Select, Row, Col, Tag, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import LineChart from '@/components/LineChart';
import Card from '@/components/Card';
import { HTTP_METHOD_CONFIG } from '@/common/constants';
import type { ApiDetailInfo } from '@/pages/Performance/types';
import type { CardProps } from '@/types';

// 模拟接口详情数据
const mockApiDetail: ApiDetailInfo = {
  path: '/api/products/detail',
  method: 'GET',
  avgResponseTime: '480 ms',
  successRate: '95.8%',
  totalCalls: 1432,
  status: 'warning',
  responseTimeChange: {
    value: '12.5%',
    trend: 'increase',
  },
  successRateChange: {
    value: '2.3%',
    trend: 'decrease',
  },
  totalCallsChange: {
    value: '5.8%',
    trend: 'increase',
  },
};

const ApiDetail: React.FC = () => {
  const { apiId } = useParams<{ apiId: string }>();
  const navigate = useNavigate();
  const [apiDetail, setApiDetail] = useState<ApiDetailInfo | null>(null);
  const [timeRange, setTimeRange] = useState<string>('近 7 天');
  const [indicator, setIndicator] = useState<string>('响应时间');
  const [chartData, setChartData] = useState<any[]>([]);

  // 模拟获取API详情数据
  useEffect(() => {
    // 实际项目中，这里应该从后端获取数据
    setTimeout(() => {
      setApiDetail(mockApiDetail);

      // 生成模拟图表数据
      const data = [];
      if (timeRange === '近 7 天') {
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
          data.push({
            date: formattedDate,
            value: Math.floor(Math.random() * 200) + 300, // 生成300-500之间的随机数
          });
        }
      }

      setChartData([
        {
          name: '响应时间',
          data: data.map((item) => item.value),
          color: '#1890ff',
          smooth: true,
          areaStyle: {
            opacity: 0.2,
          },
        },
      ]);
    }, 500);
  }, [apiId, timeRange, indicator]);

  const handleBack = () => {
    navigate(-1); // 返回上一页
  };

  // 渲染HTTP方法Tag
  const renderHttpMethodTag = (method: string) => {
    const methodUpper = method.toUpperCase();
    const config = HTTP_METHOD_CONFIG[methodUpper as keyof typeof HTTP_METHOD_CONFIG];

    if (config) {
      return <Tag color={config.color}>{config.text}</Tag>;
    }

    // 默认颜色，用于未定义的方法
    return <Tag color="default">{methodUpper}</Tag>;
  };

  // 渲染状态标签
  const renderStatusTag = (status: string) => {
    if (status === 'normal') {
      return <Tag color="success">正常</Tag>;
    } else if (status === 'warning') {
      return <Tag color="warning">告警</Tag>;
    } else if (status === 'error') {
      return <Tag color="error">异常</Tag>;
    }
    return null;
  };

  if (!apiDetail) {
    return <div className="p-4">加载中...</div>;
  }

  // 时间范围选项
  const timeRangeOptions = [
    { label: '近 24 小时', value: '0' },
    { label: '近 7 天', value: '1' },
    { label: '近 30 天', value: '2' },
    { label: '近3个月', value: '3' },
  ];

  // 指标选项
  const indicatorOptions = [
    { label: '响应时间', value: '0' },
    { label: '成功率', value: '1' },
    { label: '调用次数', value: '2' },
    { label: '错误次数', value: '3' },
  ];

  // 性能指标卡片数据
  const performanceCards: Omit<CardProps, 'className'>[] = [
    {
      title: '平均响应时间',
      value: apiDetail.avgResponseTime,
      description: '超出预期阈值 (300ms)',
      changeRate: apiDetail.responseTimeChange.value,
      changeStatus: apiDetail.responseTimeChange.trend,
      indicatorType: 'lower-better',
      performanceStatus: 'poor',
    },
    {
      title: '调用成功率',
      value: apiDetail.successRate,
      description: '低于预期值 (99%)',
      changeRate: apiDetail.successRateChange.value,
      changeStatus: apiDetail.successRateChange.trend,
      indicatorType: 'higher-better',
      performanceStatus: 'poor',
    },
    {
      title: '总调用次数',
      value: apiDetail.totalCalls.toString(),
      description: '正常流量范围内',
      changeRate: apiDetail.totalCallsChange.value,
      changeStatus: apiDetail.totalCallsChange.trend,
      indicatorType: 'higher-better',
      performanceStatus: 'good',
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* 顶部导航 */}
      <div className="flex items-center">
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack}>
          接口列表
        </Button>
      </div>

      {/* API基本信息 */}
      <div className=" flex flex-col items-start">
        <span className="text-lg font-bold">{apiDetail.path}</span>

        <div className="flex items-center mt-2">
          <span className="text-gray-500 mr-2">请求方法 :</span>
          {renderHttpMethodTag(apiDetail.method)}
        </div>

        <div className="flex items-center mt-2">
          <span className="text-gray-500 mr-2">接口状态:</span>
          {renderStatusTag(apiDetail.status)}
        </div>
      </div>

      {/* 性能指标卡片 */}
      <Row gutter={16} className=" mt-3">
        {performanceCards.map((card, index) => (
          <Col key={index} xs={24} md={8}>
            <Card {...card} className="h-full" />
          </Col>
        ))}
      </Row>

      {/* 性能趋势 */}
      <div className="bg-white px-4 rounded-lg shadow-sm flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">性能趋势</h2>
          <div className="flex space-x-4">
            <div>
              <span className="mr-2">时间范围：</span>
              <Select
                value={timeRange}
                onChange={setTimeRange}
                style={{ width: 120 }}
                options={timeRangeOptions}
              />
            </div>
            <div>
              <span className="mr-2">指标：</span>
              <Select
                value={indicator}
                onChange={setIndicator}
                style={{ width: 120 }}
                options={indicatorOptions}
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <LineChart
            series={chartData}
            xAxisData={
              chartData[0]?.data.map((_: number, index: number) => {
                const today = new Date();
                const date = new Date(today);
                date.setDate(date.getDate() - (6 - index));
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }) || []
            }
            style={{ height: '100%' }}
            yAxis={{
              type: 'value',
              name: '时间(ms)',
              axisLabel: {
                formatter: '{value}ms',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ApiDetail;
