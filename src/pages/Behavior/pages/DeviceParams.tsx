import React, { useState } from 'react';
import { Row, Col, Table, Progress } from 'antd';
import PieChart from '@/components/PieChart';
import styles from './DeviceParams.module.css';

const DeviceParams: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // 屏幕尺寸分布数据
  const screenSizeData = [
    { resolution: '1920x1080', count: 658, percentage: 65.8, device: '桌面' },
    { resolution: '1366x768', count: 234, percentage: 23.4, device: '桌面' },
    { resolution: '1440x900', count: 156, percentage: 15.6, device: '桌面' },
    { resolution: '375x667', count: 198, percentage: 19.8, device: '手机' },
    { resolution: '414x896', count: 167, percentage: 16.7, device: '手机' },
    { resolution: '360x640', count: 134, percentage: 13.4, device: '手机' },
    { resolution: '1536x864', count: 89, percentage: 8.9, device: '桌面' },
    { resolution: '390x844', count: 76, percentage: 7.6, device: '手机' },
    { resolution: '1600x900', count: 65, percentage: 6.5, device: '桌面' },
    { resolution: '393x873', count: 54, percentage: 5.4, device: '手机' },
    { resolution: '1280x720', count: 48, percentage: 4.8, device: '桌面' },
    { resolution: '412x915', count: 42, percentage: 4.2, device: '手机' },
  ];

  // 浏览器分布数据
  const browserData = [
    {
      key: 'chrome',
      browser: 'Chrome',
      count: 920,
      percentage: 73.6,
      children: [
        { key: 'chrome-119', browser: 'Chrome v119.0', count: 853, percentage: 68.2 },
        { key: 'chrome-118', browser: 'Chrome v118.0', count: 67, percentage: 5.4 },
      ],
    },
    {
      key: 'safari',
      browser: 'Safari',
      count: 254,
      percentage: 20.3,
      children: [
        { key: 'safari-17', browser: 'Safari v17.1', count: 198, percentage: 15.8 },
        { key: 'safari-16', browser: 'Safari v16.6', count: 56, percentage: 4.5 },
      ],
    },
    {
      key: 'edge',
      browser: 'Edge',
      count: 177,
      percentage: 14.2,
      children: [
        { key: 'edge-119', browser: 'Edge v119.0', count: 134, percentage: 10.7 },
        { key: 'edge-118', browser: 'Edge v118.0', count: 43, percentage: 3.4 },
      ],
    },
    {
      key: 'firefox',
      browser: 'Firefox',
      count: 127,
      percentage: 10.2,
      children: [
        { key: 'firefox-119', browser: 'Firefox v119.0', count: 89, percentage: 7.1 },
        { key: 'firefox-118', browser: 'Firefox v118.0', count: 38, percentage: 3.0 },
      ],
    },
    {
      key: 'opera',
      browser: 'Opera',
      count: 45,
      percentage: 3.6,
      children: [{ key: 'opera-104', browser: 'Opera v104.0', count: 45, percentage: 3.6 }],
    },
    {
      key: 'uc',
      browser: 'UC Browser',
      count: 29,
      percentage: 2.3,
      children: [{ key: 'uc-15', browser: 'UC Browser v15.0', count: 29, percentage: 2.3 }],
    },
    {
      key: 'samsung',
      browser: 'Samsung Internet',
      count: 23,
      percentage: 1.8,
      children: [
        { key: 'samsung-22', browser: 'Samsung Internet v22.0', count: 23, percentage: 1.8 },
      ],
    },
    {
      key: 'brave',
      browser: 'Brave',
      count: 18,
      percentage: 1.4,
      children: [{ key: 'brave-1', browser: 'Brave v1.60', count: 18, percentage: 1.4 }],
    },
  ];

  // 操作系统饼状图数据
  const osData = [
    { name: 'Windows', value: 567 },
    { name: 'macOS', value: 234 },
    { name: 'iOS', value: 189 },
    { name: 'Android', value: 145 },
    { name: 'Linux', value: 34 },
  ];

  // 操作系统颜色配置
  const osColors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'];

  // 表格列配置
  const screenColumns = [
    {
      title: '分辨率',
      dataIndex: 'resolution',
      key: 'resolution',
    },
    {
      title: '设备类型',
      dataIndex: 'device',
      key: 'device',
    },
    {
      title: '用户数',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '占比',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage: number) => (
        <div className="w-20">
          <Progress percent={percentage} size="small" />
        </div>
      ),
    },
  ];

  const browserColumns = [
    {
      title: '浏览器',
      dataIndex: 'browser',
      key: 'browser',
    },
    {
      title: '用户数',
      dataIndex: 'count',
      key: 'count',
      render: (count: number) => <span className="font-medium">{count.toLocaleString()}</span>,
    },
    {
      title: '占比',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage: number) => (
        <div className="w-20">
          <Progress percent={percentage} size="small" strokeColor="#1890ff" />
          <span className="text-xs text-gray-500 ml-1">{percentage}%</span>
        </div>
      ),
    },
  ];

  return (
    <div className=" bg-gray-50 pt-2 px-3">
      <Row gutter={16} className="mt-4">
        {/* 屏幕尺寸分布 */}
        <Col span={12}>
          <div className="bg-white px-4 pt-4 pb-4 rounded-lg shadow h-120">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">屏幕尺寸分布</span>
            </div>
            <Table
              className={styles.customScrollbar}
              dataSource={screenSizeData}
              columns={screenColumns}
              pagination={{
                pageSize: 8,
                showTotal: (total) => `共 ${total} 条记录`,
              }}
              rowKey="resolution"
              size="small"
            />
          </div>
        </Col>

        {/* 浏览器分布 */}
        <Col span={12}>
          <div className="bg-white px-4 pt-4 pb-4 rounded-lg shadow h-120">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">浏览器分布</span>
            </div>
            <Table
              className={styles.customScrollbar}
              dataSource={browserData}
              columns={browserColumns}
              pagination={{
                pageSize: 5,
                showTotal: (total) => `共 ${total} 条记录`,
              }}
              rowKey="key"
              size="small"
              scroll={{ y: 320 }}
            />
          </div>
        </Col>
      </Row>

      {/* 客户端操作系统分布 */}
      <Row gutter={16} className="mt-4">
        <Col span={12}>
          <div className="bg-white px-4 pt-4 pb-4 rounded-lg shadow h-90 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">客户端操作系统分布</span>
            </div>
            <PieChart data={osData} style={{ flex: 1 }} colors={osColors} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DeviceParams;
