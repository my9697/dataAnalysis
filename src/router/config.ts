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
            path: 'network/detail/:apiId',
            Component: lazy(() => import('@/pages/Performance/pages/ApiDetail')),
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
      },
      {
        path: ROUTER_PATH.ERROR_ANALYSIS,
        Component: lazy(() => import('@/pages/ErrorAnalysis')),
      },
    ],
  },
];

export default routes;
