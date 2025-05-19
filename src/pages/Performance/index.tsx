import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ROUTER_PATH } from '@/common/constants';

const Performance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    // 根据当前路径确定活动标签
    const path = location.pathname;
    if (path.includes('network')) return 'network';
    if (path.includes('resource')) return 'resource';
    return 'overview';
  });

  // 处理标签点击
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'overview':
        navigate(ROUTER_PATH.PERFORMANCE_OVERVIEW);
        break;
      case 'network':
        navigate(ROUTER_PATH.PERFORMANCE_NETWORK);
        break;
      case 'resource':
        navigate(ROUTER_PATH.PERFORMANCE_RESOURCE);
        break;
      default:
        navigate(ROUTER_PATH.PERFORMANCE_OVERVIEW);
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
          性能预览
        </div>
        <div className={getTabClass('network')} onClick={() => handleTabClick('network')}>
          网络分析
        </div>
        <div className={getTabClass('resource')} onClick={() => handleTabClick('resource')}>
          资源加载分析
        </div>
      </div>

      {/* 内容区域 - 通过路由Outlet渲染子页面 */}
      <Outlet />
    </div>
  );
};

export default Performance;
