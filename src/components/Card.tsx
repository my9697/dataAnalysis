import React, { useMemo, ReactNode, isValidElement } from 'react';
import { CardProps } from '@/types';
import { CHANGE_STYLES } from '@/common/constants';

/**
 * 通用卡片组件
 * 可以用于展示各种指标卡片，如性能指标、网络分析指标等
 * 支持以字符串或React节点形式传入title、value和description
 */
const Card: React.FC<CardProps> = ({
  title,
  value,
  description,
  changeRate,
  changeStatus = 'stable',
}) => {
  // 使用useMemo缓存样式计算结果，只有changeStatus变化时才重新计算
  const { color, arrow } = useMemo(() => {
    return CHANGE_STYLES[changeStatus] || CHANGE_STYLES.stable;
  }, [changeStatus]);

  // 渲染内容，支持字符串或ReactNode
  const renderContent = (content: ReactNode, defaultClassName: string) =>
    // 如果是React元素，直接返回；否则如果content不为空，用div包装；否则返回null
    isValidElement(content) ? (
      content
    ) : content != null ? (
      <div className={defaultClassName}>{content}</div>
    ) : null;

  return (
    <div className={`bg-white p-4 rounded shadow`}>
      <div className="flex items-center justify-between">
        <div>
          {title && renderContent(title, 'text-sm text-gray-500 mb-1')}
          {value !== undefined && renderContent(value, 'text-2xl font-bold')}
          {description && renderContent(description, 'text-xs text-gray-500')}
        </div>
        {changeRate !== undefined && (
          <div className={color}>
            {arrow} {changeRate}
          </div>
        )}
      </div>
    </div>
  );
};

// 使用React.memo包装组件，只有当props变化时才重新渲染
export default React.memo(Card);
