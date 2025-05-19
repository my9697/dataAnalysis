import React from 'react';
import { Layout, Menu } from 'antd';
import {
  LineChartOutlined,
  FieldTimeOutlined,
  BugOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const location = useLocation();

  // 确定当前选中的菜单项
  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path.includes('/performance')) return ['performance'];
    if (path.includes('/behavior')) return ['behavior'];
    if (path.includes('/error')) return ['error'];
    if (path.includes('/settings')) return ['settings'];
    if (path.includes('/help')) return ['help'];
    return ['performance']; // 默认选中
  };

  return (
    <Sider width={180} className="bg-white shadow-sm" theme="light">
      <Menu
        mode="inline"
        selectedKeys={getSelectedKeys()}
        style={{ height: 'calc(100% - 64px)', borderRight: 0 }}
      >
        <Menu.Item key="performance" icon={<LineChartOutlined />}>
          <Link to="/performance">性能监控</Link>
        </Menu.Item>
        <Menu.Item key="behavior" icon={<FieldTimeOutlined />}>
          <Link to="/behavior">行为监控</Link>
        </Menu.Item>
        <Menu.Item key="errorAnalysis" icon={<BugOutlined />}>
          <Link to="/errorAnalysis">异常监控</Link>
        </Menu.Item>
        <Menu.Divider />
      </Menu>
    </Sider>
  );
};

export default Sidebar;
