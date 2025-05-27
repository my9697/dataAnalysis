import React, { useState, useEffect } from 'react';
import { DatePicker, Select, Input, Button, Table, Badge, Space, Tag, Form, Row, Col } from 'antd';
import { SearchOutlined, ReloadOutlined, ExportOutlined } from '@ant-design/icons';
import Card from '@/components/Card';
import { CardProps } from '@/types';
import { ApiRequestData, FormValues } from '@/pages/Performance/types';
import { API_CATEGORY, STATUS_FILTER } from '@/common/constants';
import { useNavigate } from 'react-router-dom';

const defaultFormValues: FormValues = {
  dateRange: [],
  status: '',
  path: '',
  apiCategory: '',
};

const NetworkAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [metricsData, setMetricsData] = useState({
    avgResponseTime: '320ms',
    successRate: '99.2%',
    totalRequests: 24562,
  });
  const [apiRequests, setApiRequests] = useState<ApiRequestData[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [form] = Form.useForm();

  // 模拟API请求数据
  const mockApiRequests: ApiRequestData[] = [
    {
      path: '/api/user/info',
      method: 'GET',
      status: 200,
      responseTime: 320,
      size: '1.2MB',
      statusText: '正常',
    },
    {
      path: '/api/products/list',
      method: 'GET',
      status: 200,
      responseTime: 450,
      size: '2.4MB',
      statusText: '告警',
    },
    {
      path: '/api/order/create',
      method: 'POST',
      status: 200,
      responseTime: 280,
      size: '0.8MB',
      statusText: '正常',
    },
    {
      path: '/api/user/login',
      method: 'POST',
      status: 200,
      responseTime: 220,
      size: '0.6MB',
      statusText: '正常',
    },
    {
      path: '/api/cart/add',
      method: 'POST',
      status: 200,
      responseTime: 310,
      size: '0.9MB',
      statusText: '正常',
    },
    {
      path: '/api/products/detail',
      method: 'GET',
      status: 404,
      responseTime: 180,
      size: '0.3MB',
      statusText: '异常',
    },
    {
      path: '/api/order/list',
      method: 'GET',
      status: 200,
      responseTime: 380,
      size: '1.8MB',
      statusText: '正常',
    },
    {
      path: '/api/user/profile',
      method: 'GET',
      status: 500,
      responseTime: 210,
      size: '0.5MB',
      statusText: '异常',
    },
    {
      path: '/api/payment/process',
      method: 'POST',
      status: 200,
      responseTime: 420,
      size: '1.1MB',
      statusText: '正常',
    },
    {
      path: '/api/notification/list',
      method: 'GET',
      status: 200,
      responseTime: 290,
      size: '0.7MB',
      statusText: '正常',
    },
  ];

  useEffect(() => {
    // 初始化加载数据
    const values = form.getFieldsValue();
    fetchNetworkData({ ...values, currentPage, pageSize });
  }, []);

  const fetchNetworkData = (values?: any) => {
    if (loading) return;
    setLoading(true);

    // 模拟API调用
    setTimeout(() => {
      let filteredData = [...mockApiRequests];

      // 如果有搜索条件，进行过滤
      if (values) {
        const { searchValue, statusFilter, apiCategory, dateRange } = values;

        // 根据搜索值过滤
        if (searchValue) {
          filteredData = filteredData.filter((item) =>
            item.path.toLowerCase().includes(searchValue.toLowerCase())
          );
        }

        // 根据状态过滤
        if (statusFilter && statusFilter !== '全部') {
          filteredData = filteredData.filter((item) => item.statusText === statusFilter);
        }

        // 可以添加其他过滤条件
        // 日期范围、接口分类等
      }

      setApiRequests(filteredData);
      setLoading(false);
    }, 500);
  };

  // 表单提交处理
  const handleFormSubmit = () => {
    const values = form.getFieldsValue();
    fetchNetworkData({ ...values, currentPage, pageSize });
  };

  // 表单重置处理
  const handleFormReset = () => {
    form.resetFields();
    fetchNetworkData();
  };

  // TODO:数据的导出待实现
  const handleExport = () => {
    console.log('导出数据');
  };

  const getStatusTag = (statusText: string) => {
    if (statusText === '正常') {
      return <Tag color="success">正常</Tag>;
    } else if (statusText === '告警') {
      return <Tag color="warning">告警</Tag>;
    } else if (statusText === '异常') {
      return <Tag color="error">异常</Tag>;
    }
    return <Tag>{statusText}</Tag>;
  };

  // 跳转到API详情页面
  const handleViewDetail = (record: ApiRequestData) => {
    navigate(`/performance/network/detail/${record.id || '123456'}`);
  };

  const columns = [
    {
      title: '接口路径',
      dataIndex: 'path',
      key: 'path',
      width: '30%',
    },
    {
      title: '调用次数',
      dataIndex: 'callCount',
      key: 'callCount',
      render: () => Math.floor(Math.random() * 1000) + 500,
    },
    {
      title: '平均响应时间',
      dataIndex: 'responseTime',
      key: 'responseTime',
      render: (time: number) => `${time}ms`,
    },
    {
      title: '成功率',
      dataIndex: 'successRate',
      key: 'successRate',
      render: () => `${(Math.random() * 5 + 95).toFixed(1)}%`,
    },
    {
      title: '流量大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '状态',
      dataIndex: 'statusText',
      key: 'statusText',
      render: (text: string) => getStatusTag(text),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: ApiRequestData) => (
        <Button type="link" size="small" onClick={() => handleViewDetail(record)}>
          查看详情
        </Button>
      ),
    },
  ];

  // 统计卡片数据
  const networkCards: CardProps[] = [
    {
      title: '平均请求耗时',
      value: metricsData.avgResponseTime,
      description: '较昨日下降5.2%',
      changeRate: '5.2%',
      changeStatus: 'decrease',
      indicatorType: 'lower-better', // 耗时越低越好
      performanceStatus: 'good', // 良好状态
    },
    {
      title: '请求成功率',
      value: metricsData.successRate,
      description: '较昨日上升0.3%',
      changeRate: '0.3%',
      changeStatus: 'increase',
      performanceStatus: 'good', // 一般状态
      indicatorType: 'higher-better', // 成功率越高越好
    },
    {
      title: '总请求数',
      value: metricsData.totalRequests,
      description: '较昨日上升8.7%',
      changeRate: '8.7%',
      changeStatus: 'increase',
      performanceStatus: 'good', // 良好状态
      indicatorType: 'higher-better', // 请求数越高越好
    },
  ];

  return (
    <div className="p-6">
      {/* 卡片区域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {networkCards.map((cardProps, index) => (
          <Card key={index} {...cardProps} />
        ))}
      </div>

      {/* 筛选区域 - 使用表单重构 */}
      <div className="bg-white px-4 pt-4 rounded shadow mb-3">
        <Form form={form}>
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Form.Item name="dateRange" label="时间范围">
                <DatePicker.RangePicker
                  placeholder={['开始日期', '结束日期']}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6} lg={5}>
              <Form.Item name="apiCategory" label="接口分类">
                <Select style={{ width: '100%' }} options={API_CATEGORY} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6} lg={5}>
              <Form.Item name="status" label="状态筛选">
                <Select style={{ width: '100%' }} options={STATUS_FILTER} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6} lg={5}>
              <Form.Item name="path" label="接口路径搜索">
                <Input
                  placeholder="搜索接口路径"
                  style={{ width: '100%' }}
                  suffix={<SearchOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} md={24} lg={3}>
              <Form.Item>
                <Space>
                  <Button type="primary" icon={<SearchOutlined />} onClick={handleFormSubmit}>
                    搜索
                  </Button>
                  <Button icon={<ReloadOutlined />} onClick={handleFormReset}>
                    重置
                  </Button>
                  <Button icon={<ExportOutlined />} onClick={handleExport}>
                    导出
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      {/* 数据表格 */}
      <div className="bg-white px-4 rounded shadow">
        <Table
          columns={columns}
          dataSource={apiRequests.map((item, index) => ({ ...item, key: index }))}
          loading={loading}
          pagination={{
            pageSize: 10,
            showTotal: () => `共${total}条数据`,
          }}
        />
      </div>
    </div>
  );
};

export default NetworkAnalysis;
