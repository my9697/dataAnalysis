import { lazy } from 'react';
import MainLayout from '@/layout/MainLayout';
import { ROUTER_PATH } from '@/common/constants';

const routes = [
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        path: ROUTER_PATH.PERFORMANCE,
        Component: lazy(() => import('@/pages/Performance')),
        children: [
          {
            path: ROUTER_PATH.PERFORMANCE_OVERVIEW,
            Component: lazy(() => import('@/pages/Performance/pages/Overview')),
          },
          {
            path: ROUTER_PATH.PERFORMANCE_NETWORK,
            Component: lazy(() => import('@/pages/Performance/pages/NetworkAnalysis')),
          },
          {
            path: ROUTER_PATH.PERFORMANCE_RESOURCE,
            Component: lazy(() => import('@/pages/Performance/pages/ResourceAnalysis')),
          },
        ],
      },
      {
        path: ROUTER_PATH.BEHAVIOR,
        Component: lazy(() => import('@/pages/Behavior')),
        children: [
          {
            path: ROUTER_PATH.BEHAVIOR_VISIT_STATS,
            Component: lazy(() => import('@/pages/Behavior/pages/VisitStats')),
          },
          {
            path: ROUTER_PATH.BEHAVIOR_DEVICE_PARAMS,
            Component: lazy(() => import('@/pages/Behavior/pages/DeviceParams')),
          },
        ],
      },
      {
        path: ROUTER_PATH.ERROR_ANALYSIS,
        Component: lazy(() => import('@/pages/ErrorMonitor')),
        children: [
          {
            path: ROUTER_PATH.ERROR_OVERVIEW,
            Component: lazy(() => import('@/pages/ErrorMonitor/pages/Overview')),
          },
          {
            path: ROUTER_PATH.ERROR_LIST,
            Component: lazy(() => import('@/pages/ErrorMonitor/pages/ErrorList')),
          },
        ],
      },
      {
        path: 'network/detail',
        Component: lazy(() => import('@/pages/Performance/pages/ApiDetail')),
      },
    ],
  },
];

export default routes;
