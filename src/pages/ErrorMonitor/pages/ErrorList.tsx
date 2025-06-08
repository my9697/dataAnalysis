import React, { useState } from 'react';
import {
  Row,
  Col,
  Table,
  Select,
  DatePicker,
  Input,
  Button,
  Tag,
  Drawer,
  Descriptions,
  Typography,
  Space,
  Collapse,
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  ExclamationCircleOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import styles from '../ErrorMonitor.module.css';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

const ErrorList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [selectedError, setSelectedError] = useState<any>(null);

  // 筛选选项配置
  const filterOptions = {
    errorTypes: [
      { value: 'all', label: '全部类型' },
      { value: 'TypeError', label: 'TypeError' },
      { value: 'SyntaxError', label: 'SyntaxError' },
      { value: 'ReferenceError', label: 'ReferenceError' },
      { value: 'NetworkError', label: 'NetworkError' },
      { value: 'RangeError', label: 'RangeError' },
      { value: 'URIError', label: 'URIError' },
    ],
    statusOptions: [
      { value: 'all', label: '全部' },
      { value: 'resolved', label: '已解决' },
      { value: 'unresolved', label: '未解决' },
    ],
  };

  // 错误列表数据
  const errorListData = [
    {
      key: '1',
      type: 'TypeError',
      message: 'Cannot read property length of undefined',
      path: '/user/dashboard',
      count: 128,
      affectedUsers: 45,
      lastOccur: '5小时前',
      status: 'unresolved',
      timestamp: '2025-05-10 14:30:25',
      stackTrace: `TypeError: Cannot read property 'length' of undefined
    at UserDashboard.render (/src/components/Dashboard.tsx:125)
    at React.Component.render
    at React.createElement`,
      deviceInfo: {
        deviceType: 'Desktop',
        browser: 'Chrome 96.0.4664.110',
        os: 'Windows 11',
        location: '中国 北京',
      },
      requestInfo: {
        url: '/api/user/dashboard/data',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ****',
        },
        payload: {},
      },
      userBehaviorTrace: [
        {
          id: 1,
          action: '页面加载',
          path: '/user/dashboard',
          description: '用户访问仪表板页面',
          timestamp: '2025-05-10 14:30:20',
          type: 'page_view',
        },
        {
          id: 2,
          action: '点击按钮',
          path: '/user/dashboard',
          description: '点击"刷新数据"按钮',
          timestamp: '2025-05-10 14:30:22',
          type: 'click',
        },
        {
          id: 3,
          action: '接口调用',
          path: '/user/dashboard',
          description: '调用获取用户数据接口失败',
          timestamp: '2025-05-10 14:30:25',
          type: 'api_error',
        },
      ],
    },
    {
      key: '2',
      type: 'SyntaxError',
      message: 'Unexpected token <...',
      path: '/api/products/list',
      count: 86,
      affectedUsers: 32,
      lastOccur: '6小时前',
      status: 'unresolved',
      timestamp: '2025-05-10 13:15:42',
      stackTrace: `SyntaxError: Unexpected token < in JSON at position 0
    at JSON.parse (<anonymous>)
    at ProductService.getList (/src/services/product.ts:45)
    at ProductList.componentDidMount`,
      deviceInfo: {
        deviceType: 'Mobile',
        browser: 'Safari 15.2',
        os: 'iOS 15.2',
        location: '中国 上海',
      },
      requestInfo: {
        url: '/api/products/list',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        payload: { page: 1, limit: 20 },
      },
      userBehaviorTrace: [
        {
          id: 1,
          action: '页面加载',
          path: '/api/products/list',
          description: '用户访问产品列表页面',
          timestamp: '2025-05-10 13:15:30',
          type: 'page_view',
        },
        {
          id: 2,
          action: '搜索操作',
          path: '/api/products/list',
          description: '用户搜索产品关键词',
          timestamp: '2025-05-10 13:15:40',
          type: 'search',
        },
        {
          id: 3,
          action: '接口调用',
          path: '/api/products/list',
          description: '获取产品列表数据失败',
          timestamp: '2025-05-10 13:15:42',
          type: 'api_error',
        },
      ],
    },
    {
      key: '3',
      type: 'ReferenceError',
      message: 'productData is not defined',
      path: '/products/detail',
      count: 64,
      affectedUsers: 28,
      lastOccur: '8小时前',
      status: 'resolved',
      timestamp: '2025-05-10 12:45:18',
      stackTrace: `ReferenceError: productData is not defined
    at ProductDetail.render (/src/components/ProductDetail.tsx:89)
    at ProductDetail.componentDidMount
    at callCallback`,
      deviceInfo: {
        deviceType: 'Desktop',
        browser: 'Firefox 98.0',
        os: 'macOS 12.3',
        location: '中国 广州',
      },
      requestInfo: {
        url: '/api/products/123',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
        payload: { id: 123 },
      },
      userBehaviorTrace: [
        {
          id: 1,
          action: '页面加载',
          path: '/products/detail',
          description: '用户访问产品详情页面',
          timestamp: '2025-05-10 12:45:10',
          type: 'page_view',
        },
        {
          id: 2,
          action: '数据获取',
          path: '/products/detail',
          description: '获取产品详细信息',
          timestamp: '2025-05-10 12:45:15',
          type: 'api_call',
        },
        {
          id: 3,
          action: '渲染错误',
          path: '/products/detail',
          description: '组件渲染时引用未定义变量',
          timestamp: '2025-05-10 12:45:18',
          type: 'render_error',
        },
      ],
    },
    {
      key: '4',
      type: 'NetworkError',
      message: 'Failed to fetch',
      path: '/api/checkout/payment',
      count: 42,
      affectedUsers: 18,
      lastOccur: '9小时前',
      status: 'unresolved',
      timestamp: '2025-05-10 11:20:35',
      stackTrace: `NetworkError: Failed to fetch
    at fetch (native)
    at PaymentService.processPayment (/src/services/payment.ts:156)
    at CheckoutPage.handlePayment`,
      deviceInfo: {
        deviceType: 'Mobile',
        browser: 'Chrome 96.0.4664.45',
        os: 'Android 12',
        location: '中国 深圳',
      },
      requestInfo: {
        url: '/api/checkout/payment',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ****',
        },
        payload: {
          amount: 299.99,
          paymentMethod: 'credit_card',
        },
      },
      userBehaviorTrace: [
        {
          id: 1,
          action: '页面加载',
          path: '/checkout',
          description: '用户进入结算页面',
          timestamp: '2025-05-10 11:20:10',
          type: 'page_view',
        },
        {
          id: 2,
          action: '填写信息',
          path: '/checkout',
          description: '用户填写支付信息',
          timestamp: '2025-05-10 11:20:25',
          type: 'form_fill',
        },
        {
          id: 3,
          action: '提交支付',
          path: '/checkout',
          description: '点击提交支付按钮',
          timestamp: '2025-05-10 11:20:30',
          type: 'click',
        },
        {
          id: 4,
          action: '支付失败',
          path: '/api/checkout/payment',
          description: '支付接口调用失败',
          timestamp: '2025-05-10 11:20:35',
          type: 'api_error',
        },
      ],
    },
    {
      key: '5',
      type: 'RangeError',
      message: 'Maximum call stack...',
      path: '/cart',
      count: 35,
      affectedUsers: 15,
      lastOccur: '8小时前',
      status: 'unresolved',
    },
    {
      key: '6',
      type: 'URIError',
      message: 'URI malformed',
      path: '/search',
      count: 28,
      affectedUsers: 12,
      lastOccur: '10小时前',
      status: 'resolved',
    },
    {
      key: '7',
      type: 'TypeError',
      message: 'Cannot read property...',
      path: '/user/profile',
      count: 24,
      affectedUsers: 10,
      lastOccur: '7小时前',
      status: 'unresolved',
    },
    {
      key: '8',
      type: 'SyntaxError',
      message: 'Unexpected end of JSON...',
      path: '/api/user/preferences',
      count: 18,
      affectedUsers: 8,
      lastOccur: '12小时前',
      status: 'resolved',
    },
    {
      key: '6',
      type: 'URIError',
      message: 'URI malformed',
      path: '/search',
      count: 28,
      affectedUsers: 12,
      lastOccur: '10小时前',
      status: 'resolved',
    },
    {
      key: '7',
      type: 'TypeError',
      message: 'Cannot read property...',
      path: '/user/profile',
      count: 24,
      affectedUsers: 10,
      lastOccur: '7小时前',
      status: 'unresolved',
    },
    {
      key: '8',
      type: 'SyntaxError',
      message: 'Unexpected end of JSON...',
      path: '/api/user/preferences',
      count: 18,
      affectedUsers: 8,
      lastOccur: '12小时前',
      status: 'resolved',
    },
  ];

  // 表格列配置
  const errorColumns = [
    {
      title: '错误类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const getTypeIcon = (errorType: string) => {
          switch (errorType) {
            case 'TypeError':
              return '🔴';
            case 'SyntaxError':
              return '🟠';
            case 'ReferenceError':
              return '🟡';
            case 'NetworkError':
              return '🟠';
            case 'RangeError':
              return '🟡';
            case 'URIError':
              return '🟢';
            default:
              return '🔵';
          }
        };
        return (
          <div className="flex items-center">
            <span className="mr-2">{getTypeIcon(type)}</span>
            <span>{type}</span>
          </div>
        );
      },
    },
    {
      title: '错误信息',
      dataIndex: 'message',
      key: 'message',
      width: '25%',
    },
    {
      title: '页面路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '出现次数',
      dataIndex: 'count',
      key: 'count',
      sorter: (a: any, b: any) => a.count - b.count,
      render: (count: number) => <span className="font-medium">{count.toLocaleString()}</span>,
    },
    {
      title: '影响用户数',
      dataIndex: 'affectedUsers',
      key: 'affectedUsers',
      sorter: (a: any, b: any) => a.affectedUsers - b.affectedUsers,
      render: (users: number) => <span className="font-medium">{users}</span>,
    },
    {
      title: '最后出现',
      dataIndex: 'lastOccur',
      key: 'lastOccur',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'resolved' ? 'green' : 'red'}>
          {status === 'resolved' ? '已解决' : '未解决'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Button
          type="link"
          size="small"
          onClick={() => {
            setSelectedError(record);
            setDetailModalVisible(true);
          }}
        >
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 px-3 pt-2">
      {/* 筛选和操作区域 */}
      <Row gutter={16}>
        <Col span={24}>
          <div className="bg-white px-4 pt-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">异常筛选</span>
            </div>
            <Row gutter={16} className="mb-4">
              <Col span={4}>
                <Select defaultValue="全部类型" style={{ width: '100%' }}>
                  {filterOptions.errorTypes.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={4}>
                <Select defaultValue="全部" style={{ width: '100%' }}>
                  {filterOptions.statusOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Col>

              <Col span={4}>
                <Input placeholder="搜索错误信息或页面路径" prefix={<SearchOutlined />} />
              </Col>
              <Col span={3}>
                <Button icon={<FilterOutlined />}>筛选</Button>
              </Col>
            </Row>
            <div className="flex justify-between items-center mb-4">
              <span>共 {errorListData.length} 条异常</span>
            </div>
            <Table
              className={styles.customScrollbar}
              dataSource={errorListData}
              columns={errorColumns}
              pagination={{
                pageSize: 10,
                showTotal: (total) => `共 ${total} 条记录`,
              }}
              rowKey="key"
              size="small"
              rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log('选中的错误:', selectedRowKeys, selectedRows);
                },
              }}
            />
          </div>
        </Col>
      </Row>

      {/* 错误详情抽屉 */}
      <Drawer
        title={
          <div className="flex items-center">
            <ExclamationCircleOutlined className="text-red-500 mr-2" />
            <span>错误详情</span>
            {selectedError && (
              <Tag
                color={
                  selectedError.type === 'TypeError'
                    ? 'red'
                    : selectedError.type === 'SyntaxError'
                    ? 'orange'
                    : 'gold'
                }
                className="ml-2"
              >
                {selectedError.type}
              </Tag>
            )}
          </div>
        }
        open={detailModalVisible}
        onClose={() => {
          setDetailModalVisible(false);
          setSelectedError(null);
        }}
        width={800}
        className="error-detail-modal"
      >
        {selectedError && (
          <div className="space-y-4">
            {/* 操作按钮区域 */}
            <div className="flex justify-end gap-2 pb-4 border-b">
              <Button size="small" type="primary" icon={<CheckOutlined />}>
                标记为已解决
              </Button>
              <Button size="small" icon={<CloseOutlined />}>
                忽略
              </Button>
            </div>

            {/* 基本信息 */}
            <div>
              <Text strong className="text-gray-600">
                错误信息
              </Text>
              <Paragraph className="mt-2 bg-red-50 p-3 rounded text-red-700">
                {selectedError.message}
              </Paragraph>
            </div>

            <div>
              <Text strong className="text-gray-600">
                发生时间
              </Text>
              <Paragraph className="mt-1">{selectedError.timestamp}</Paragraph>
            </div>

            {/* 堆栈信息 */}
            <div>
              <Text strong className="text-gray-600">
                堆栈信息
              </Text>
              <Paragraph className="mt-2 bg-gray-50 p-3 rounded font-mono text-sm whitespace-pre-wrap">
                {selectedError.stackTrace}
              </Paragraph>
            </div>

            {/* 折叠面板 */}
            <Collapse ghost>
              <Panel header="设备信息" key="device">
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>设备类型：</Text>
                    <Text>{selectedError.deviceInfo?.deviceType}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>浏览器：</Text>
                    <Text>{selectedError.deviceInfo?.browser}</Text>
                  </Col>
                  <Col span={12} className="mt-2">
                    <Text strong>操作系统：</Text>
                    <Text>{selectedError.deviceInfo?.os}</Text>
                  </Col>
                  <Col span={12} className="mt-2">
                    <Text strong>地理位置：</Text>
                    <Text>{selectedError.deviceInfo?.location}</Text>
                  </Col>
                </Row>
              </Panel>

              <Panel header="请求信息" key="request">
                <div className="space-y-3">
                  <div>
                    <Text strong>URL：</Text>
                    <Text code>{selectedError.requestInfo?.url}</Text>
                  </div>
                  <div>
                    <Text strong>Method：</Text>
                    <Text>{selectedError.requestInfo?.method}</Text>
                  </div>
                  <div>
                    <Text strong>Headers：</Text>
                    <Paragraph className="mt-1 bg-gray-50 p-2 rounded font-mono text-xs">
                      {JSON.stringify(selectedError.requestInfo?.headers, null, 2)}
                    </Paragraph>
                  </div>
                  <div>
                    <Text strong>Payload：</Text>
                    <Paragraph className="mt-1 bg-gray-50 p-2 rounded font-mono text-xs">
                      {JSON.stringify(selectedError.requestInfo?.payload, null, 2)}
                    </Paragraph>
                  </div>
                </div>
              </Panel>

              <Panel header="用户行为轨迹" key="userTrace">
                <div className="space-y-3">
                  {selectedError.userBehaviorTrace?.map((trace: any) => (
                    <div key={trace.id} className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          trace.type === 'page_view'
                            ? 'bg-blue-500'
                            : trace.type === 'click'
                            ? 'bg-green-500'
                            : trace.type === 'search'
                            ? 'bg-yellow-500'
                            : trace.type === 'api_error'
                            ? 'bg-red-500'
                            : 'bg-gray-500'
                        }`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Text strong>{trace.action}</Text>
                          <Text className="text-gray-500 text-sm">{trace.timestamp}</Text>
                        </div>
                        <div className="text-gray-600 text-sm mt-1">
                          <Text code className="text-sm">
                            {trace.path}
                          </Text>
                        </div>
                        <div className="text-gray-700 mt-1">{trace.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </Collapse>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default ErrorList;
