import React from 'react';
import Card from '../../../components/Card';
import { CardProps } from '@/types';

const NetworkAnalysis: React.FC = () => {
  // 网络请求分析卡片数据
  const networkCards: CardProps[] = [
    {
      title: '请求总量',
      value: '127',
      description: '较昨日减少 15 个',
      changeRate: '减少 15 个',
      changeStatus: 'increase',
    },
    {
      title: '平均响应时间',
      value: '320ms',
      description: '较昨日增加 45ms',
      changeRate: '增加 45ms',
      changeStatus: 'decrease',
    },
    {
      title: '错误率',
      value: '1.2%',
      description: '较昨日降低 0.5%',
      changeRate: '降低 0.5%',
      changeStatus: 'increase',
    },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {networkCards.map((cardProps, index) => (
          <Card key={index} {...cardProps} />
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-medium mb-4">请求详情</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">URL</th>
              <th className="text-left p-2">方法</th>
              <th className="text-left p-2">状态</th>
              <th className="text-left p-2">时间</th>
              <th className="text-left p-2">大小</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-2">/api/v1/users</td>
              <td className="p-2">GET</td>
              <td className="p-2">200</td>
              <td className="p-2">156ms</td>
              <td className="p-2">24.5KB</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-2">/api/v1/stats</td>
              <td className="p-2">POST</td>
              <td className="p-2">201</td>
              <td className="p-2">245ms</td>
              <td className="p-2">12.3KB</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-2">/api/v1/analytics</td>
              <td className="p-2">GET</td>
              <td className="p-2">200</td>
              <td className="p-2">189ms</td>
              <td className="p-2">56.7KB</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-2">/api/v1/config</td>
              <td className="p-2">GET</td>
              <td className="p-2">304</td>
              <td className="p-2">45ms</td>
              <td className="p-2">3.2KB</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-2">/api/v1/events</td>
              <td className="p-2">POST</td>
              <td className="p-2 text-red-500">500</td>
              <td className="p-2">324ms</td>
              <td className="p-2">8.9KB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NetworkAnalysis;
