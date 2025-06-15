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
        browser: 'Chrome 96.0.4664.110',
        os: 'Windows 11',
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
                    <Text strong>浏览器：</Text>
                    <Text>{selectedError.deviceInfo?.browser}</Text>
                  </Col>
                  <Col span={12} className="mt-2">
                    <Text strong>操作系统：</Text>
                    <Text>{selectedError.deviceInfo?.os}</Text>
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
                <div className="relative space-y-0">
                  {selectedError.userBehaviorTrace?.map((trace: any, index: number) => (
                    <div
                      key={trace.id}
                      className="flex items-start relative"
                      style={{ minHeight: '80px' }}
                    >
                      <div
                        className="relative flex items-start"
                        style={{ width: '24px', marginRight: '12px' }}
                      >
                        {/* 连接线 */}
                        {index !== selectedError.userBehaviorTrace.length - 1 && (
                          <div
                            className="absolute w-0.5 bg-gray-200"
                            style={{
                              left: '5px',
                              top: '15px',
                              height: '80px',
                            }}
                          />
                        )}
                        {/* 圆点 */}
                        <div
                          className={`w-3 h-3 rounded-full z-10 relative ${
                            trace.type === 'api_error' ? 'bg-red-500' : 'bg-blue-500'
                          }`}
                          style={{
                            marginTop: '6px',
                          }}
                        />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-sm">
                          <Text strong>{trace.action}</Text>
                          <div className="mt-1">
                            <Text code className="text-xs text-gray-600">
                              {trace.path}
                            </Text>
                          </div>
                          <div className="text-gray-400 text-xs mt-1">{trace.description}</div>
                          <div className="text-gray-400 text-xs mt-1">{trace.timestamp}</div>
                        </div>
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
