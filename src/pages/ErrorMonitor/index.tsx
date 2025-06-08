import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ROUTER_PATH } from '@/common/constants';

const ErrorMonitor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    // 根据当前路径确定活动标签
    const path = location.pathname;
    if (path.includes('error-list')) return 'error-list';
    return 'overview';
  });

  // 处理默认路由重定向
  useEffect(() => {
    if (location.pathname === ROUTER_PATH.ERROR_ANALYSIS) {
      navigate(ROUTER_PATH.ERROR_OVERVIEW, { replace: true });
    }
  }, [location.pathname, navigate]);

  // 处理标签点击
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'overview':
        navigate(ROUTER_PATH.ERROR_OVERVIEW);
        break;
      case 'error-list':
        navigate(ROUTER_PATH.ERROR_LIST);
        break;
      default:
        navigate(ROUTER_PATH.ERROR_OVERVIEW);
    }
  };

  // 获取标签类
  const getTabClass = (tab: string) => {
    const baseClass = 'px-3 py-2 cursor-pointer';
    return activeTab === tab
      ? `${baseClass} font-bold text-blue-600 border-b-2 border-blue-600`
      : `${baseClass} text-gray-600 hover:text-gray-800`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* 选项卡导航 */}
      <div className="flex border-b">
        <div className={getTabClass('overview')} onClick={() => handleTabClick('overview')}>
          异常概览
        </div>
        <div className={getTabClass('error-list')} onClick={() => handleTabClick('error-list')}>
          错误列表
        </div>
      </div>

      {/* 内容区域 - 通过路由Outlet渲染子页面 */}
      <Outlet />
    </div>
  );
};

export default ErrorMonitor;
