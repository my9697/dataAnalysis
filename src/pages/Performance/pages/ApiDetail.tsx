import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Select, Row, Col, Statistic, Tag, Dropdown, Space } from 'antd';
import { ArrowLeftOutlined, ReloadOutlined, DownloadOutlined } from '@ant-design/icons';
import LineChart from '@/components/LineChart';

interface ApiDetailInfo {
  path: string;
  description: string;
  apiId: string;
  method: string;
  createTime: string;
  updateTime: string;
  avgResponseTime: string;
  successRate: string;
  totalCalls: number;
  status: 'normal' | 'warning' | 'error';
  responseTimeChange: {
    value: string;
    trend: 'up' | 'down';
  };
  successRateChange: {
    value: string;
    trend: 'up' | 'down';
  };
  totalCallsChange: {
    value: string;
    trend: 'up' | 'down';
  };
}

// 模拟接口详情数据
const mockApiDetail: ApiDetailInfo = {
  path: '/api/products/detail',
  description: '获取商品详细信息，包含商品基础信息、规格、价格、库存等数据',
  apiId: 'API_2025051001',
  method: 'GET',
  createTime: '2024-12-15 10:30:45',
  updateTime: '2025-05-09 18:45:22',
  avgResponseTime: '480 ms',
  successRate: '95.8%',
  totalCalls: 1432,
  status: 'warning',
  responseTimeChange: {
    value: '12.5%',
    trend: 'up',
  },
  successRateChange: {
    value: '2.3%',
    trend: 'down',
  },
  totalCallsChange: {
    value: '5.8%',
    trend: 'up',
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

  const handleRefresh = () => {
    // 刷新数据
    console.log('刷新数据');
  };

  const handleExport = () => {
    // 导出报告
    console.log('导出报告');
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

  // 渲染变化率
  const renderChangeRate = (value: string, trend: 'up' | 'down') => {
    const color = trend === 'up' ? '#ff4d4f' : '#52c41a';
    const icon = trend === 'up' ? '↑' : '↓';
    return (
      <span style={{ color }}>
        {icon} {value} 较昨日
      </span>
    );
  };

  if (!apiDetail) {
    return <div className="p-4">加载中...</div>;
  }

  // 时间范围选项
  const timeRangeOptions = [
    { label: '近 24 小时', value: '近 24 小时' },
    { label: '近 7 天', value: '近 7 天' },
    { label: '近 30 天', value: '近 30 天' },
    { label: '自定义', value: '自定义' },
  ];

  // 指标选项
  const indicatorOptions = [
    { label: '响应时间', value: '响应时间' },
    { label: '成功率', value: '成功率' },
    { label: '调用次数', value: '调用次数' },
    { label: '错误次数', value: '错误次数' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* 顶部导航 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack} className="mr-2">
            返回接口列表
          </Button>
          <h1 className="text-xl font-bold m-0">接口详情</h1>
        </div>
        <div>
          <Button icon={<ReloadOutlined />} onClick={handleRefresh} className="mr-2">
            刷新数据
          </Button>
          <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
            导出报告
          </Button>
        </div>
      </div>

      {/* API基本信息 */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold mb-2">{apiDetail.path}</h2>
            <p className="text-gray-500">{apiDetail.description}</p>
          </div>
          {apiDetail.status && <div>{renderStatusTag(apiDetail.status)}</div>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">接口 ID：</span>
            <span>{apiDetail.apiId}</span>
          </div>
          <div>
            <span className="text-gray-500">请求方式：</span>
            <span>{apiDetail.method}</span>
          </div>
          <div>
            <span className="text-gray-500">创建时间：</span>
            <span>{apiDetail.createTime}</span>
          </div>
          <div>
            <span className="text-gray-500">最后更新：</span>
            <span>{apiDetail.updateTime}</span>
          </div>
        </div>
      </div>

      {/* 性能指标卡片 */}
      <Row gutter={16} className="mb-4">
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="平均响应时间"
              value={apiDetail.avgResponseTime}
              valueStyle={{ color: '#ff4d4f', fontSize: '28px' }}
            />
            <div className="mt-2 text-sm">
              {renderChangeRate(
                apiDetail.responseTimeChange.value,
                apiDetail.responseTimeChange.trend
              )}
            </div>
            <div className="mt-2 text-sm text-yellow-500">● 超出预期阈值 (300ms)</div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="调用成功率"
              value={apiDetail.successRate}
              valueStyle={{ color: '#ff4d4f', fontSize: '28px' }}
            />
            <div className="mt-2 text-sm">
              {renderChangeRate(
                apiDetail.successRateChange.value,
                apiDetail.successRateChange.trend
              )}
            </div>
            <div className="mt-2 text-sm text-red-500">● 低于预期值 (99%)</div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="总调用次数"
              value={apiDetail.totalCalls}
              valueStyle={{ fontSize: '28px' }}
            />
            <div className="mt-2 text-sm">
              {renderChangeRate(apiDetail.totalCallsChange.value, apiDetail.totalCallsChange.trend)}
            </div>
            <div className="mt-2 text-sm text-green-500">● 正常流量范围内</div>
          </Card>
        </Col>
      </Row>

      {/* 性能趋势 */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
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

        <div style={{ height: '300px' }}>
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
