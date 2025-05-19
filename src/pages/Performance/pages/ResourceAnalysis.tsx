import React from 'react';
import Card from '../../../components/Card';
import { CardProps } from '@/types';

const ResourceAnalysis: React.FC = () => {
  // 资源加载分析卡片数据
  const resourceCards: CardProps[] = [
    {
      title: '总资源数',
      value: '86',
      description: '较昨日减少 7 个',
      changeRate: '减少 7 个',
      changeStatus: 'increase',
    },
    {
      title: '总加载大小',
      value: '2.8MB',
      description: '较昨日减少 320KB',
      changeRate: '减少 320KB',
      changeStatus: 'increase',
    },
    {
      title: '加载失败资源',
      value: '2',
      description: '较昨日增加 1 个',
      changeRate: '增加 1 个',
      changeStatus: 'decrease',
    },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {resourceCards.map((cardProps, index) => (
          <Card key={index} {...cardProps} />
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-medium mb-4">资源类型分布</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          此处显示资源类型分布饼图
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-medium mb-4">资源加载详情</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">资源</th>
              <th className="text-left p-2">类型</th>
              <th className="text-left p-2">大小</th>
              <th className="text-left p-2">加载时间</th>
              <th className="text-left p-2">状态</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-2">/assets/js/main.js</td>
              <td className="p-2">JavaScript</td>
              <td className="p-2">156KB</td>
              <td className="p-2">245ms</td>
              <td className="p-2 text-green-500">已加载</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-2">/assets/css/styles.css</td>
              <td className="p-2">CSS</td>
              <td className="p-2">42KB</td>
              <td className="p-2">89ms</td>
              <td className="p-2 text-green-500">已加载</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-2">/assets/images/banner.jpg</td>
              <td className="p-2">图片</td>
              <td className="p-2">785KB</td>
              <td className="p-2">320ms</td>
              <td className="p-2 text-green-500">已加载</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-2">/assets/fonts/roboto.woff2</td>
              <td className="p-2">字体</td>
              <td className="p-2">78KB</td>
              <td className="p-2">156ms</td>
              <td className="p-2 text-green-500">已加载</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-2">/assets/videos/intro.mp4</td>
              <td className="p-2">视频</td>
              <td className="p-2">1.2MB</td>
              <td className="p-2">890ms</td>
              <td className="p-2 text-red-500">加载失败</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourceAnalysis;
