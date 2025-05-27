import React, { useMemo, isValidElement } from 'react';
import { CardProps } from '@/types';
import {
  STATUS_TEXT,
  STATUS_BG_COLOR,
  STATUS_ARROW,
  STATUS_ARROW_COLOR,
  STATUS_COLOR,
} from '@/common/constants';

const Card: React.FC<CardProps> = ({
  title,
  value,
  description,
  changeRate,
  changeStatus = 'stable',
  indicatorType = 'higher-better',
  titleColor,
  performanceStatus,
  className,
}) => {
  // 获取性能状态颜色和文本
  const statusFromPerformance = useMemo(() => {
    const statusColor = {
      good: STATUS_COLOR.good,
      normal: STATUS_COLOR.normal,
      poor: STATUS_COLOR.poor,
    };

    // 组合返回结果
    return {
      color: statusColor[performanceStatus],
      bgColor: STATUS_BG_COLOR[performanceStatus],
      text: STATUS_TEXT[performanceStatus],
    };
  }, [performanceStatus]);

  // 使用useMemo缓存样式计算结果
  const { color, arrow } = useMemo(() => {
    // 获取颜色
    const getArrowColor = {
      increase:
        indicatorType === 'higher-better'
          ? STATUS_ARROW_COLOR.increase
          : STATUS_ARROW_COLOR.decrease,
      stable: STATUS_ARROW_COLOR.stable,
      decrease:
        indicatorType === 'higher-better'
          ? STATUS_ARROW_COLOR.decrease
          : STATUS_ARROW_COLOR.increase,
    };

    return {
      arrow: STATUS_ARROW[changeStatus],
      color: getArrowColor[changeStatus],
    };
  }, [changeStatus, indicatorType]);

  // 渲染标题
  const renderTitle = () => {
    if (isValidElement(title)) {
      return title; // 如果是React元素，直接返回
    }

    return (
      <div className="flex items-center text-sm text-gray-500 mb-1">
        {titleColor && (
          <span
            className="inline-block mr-1 w-3 h-3 rounded-full"
            style={{ backgroundColor: titleColor }}
          ></span>
        )}
        {title}
      </div>
    );
  };

  // 渲染值
  const renderValue = () => {
    if (isValidElement(value)) {
      return value; // 如果是React元素，直接返回
    }

    return (
      <div className="flex items-center">
        <span className="text-2xl font-bold">{value}</span>
        {statusFromPerformance && (
          <span className={`ml-1 text-xs ${statusFromPerformance.color}`}>
            {statusFromPerformance.text}
          </span>
        )}
      </div>
    );
  };

  // 渲染描述
  const renderDescription = () => {
    if (!description) return null;

    if (isValidElement(description)) {
      return description; // 如果是React元素，直接返回
    }

    return (
      <div className="flex items-center text-xs text-gray-500">
        {description}
        {statusFromPerformance && (
          <span
            className={`inline-block ml-1 w-2 h-2 ${statusFromPerformance.bgColor} rounded-full`}
          ></span>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white p-4 rounded shadow ${className || ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex-grow">
          {renderTitle()}
          {renderValue()}
          {renderDescription()}
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
