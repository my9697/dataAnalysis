import React from 'react';
import { Layout, Badge, Avatar, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  return (
    <AntHeader className="bg-white flex justify-between items-center py-7  shadow-sm h-10">
      <div className="text-base font-bold text-blue-600">数据分析平台</div>
      {/* TODO:实现异常信息提醒，值班提醒。 */}
      <div className="flex items-center">
        <Badge count={1} size="small" className="">
          <Button
            type="text"
            shape="circle"
            size="middle"
            icon={<BellOutlined style={{ fontSize: 22 }} />}
            className=""
          />
        </Badge>
        {/* TODO:实现用户登录 */}
        <div className="ml-4 flex items-center">
          <Avatar className="bg-purple-500">AD</Avatar>
          <span className="ml-2 text-gray-700">管理员</span>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
