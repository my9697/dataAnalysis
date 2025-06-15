import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className="h-screen">
      <Header />
      <Layout className="flex-1">
        <Sidebar />
        <Layout className="p-2 bg-gray-50 ">
          <Content className="bg-white p-3 rounded-xl h-full overflow-y-scroll">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
