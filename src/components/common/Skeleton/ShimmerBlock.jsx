import React from 'react';
import './style.scss';

export const ShimmerBlock = ({ className = '', width, height, borderRadius, style }) => (
  <div
    className={`skeleton-shimmer-block ${className}`}
    style={{
      width: width || '100%',
      height: height || '1.6rem',
      borderRadius: borderRadius || '0.4rem',
      ...style,
    }}
  />
);

export default ShimmerBlock;
