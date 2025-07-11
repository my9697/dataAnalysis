import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ROUTER_PATH } from '@/common/constants';

const Behavior = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    // 根据当前路径确定活动标签
    const path = location.pathname;
    if (path.includes('device-params')) return 'device-params';
    return 'visit-stats';
  });

  // 处理标签点击
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'visit-stats':
        navigate(ROUTER_PATH.BEHAVIOR_VISIT_STATS);
        break;
      case 'device-params':
        navigate(ROUTER_PATH.BEHAVIOR_DEVICE_PARAMS);
        break;
      default:
        navigate(ROUTER_PATH.BEHAVIOR_VISIT_STATS);
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
        <div className={getTabClass('visit-stats')} onClick={() => handleTabClick('visit-stats')}>
          访问统计
        </div>
        <div
          className={getTabClass('device-params')}
          onClick={() => handleTabClick('device-params')}
        >
          设备参数
        </div>
      </div>

      {/* 内容区域 - 通过路由Outlet渲染子页面 */}
      <Outlet />
    </div>
  );
};

export default Behavior;
