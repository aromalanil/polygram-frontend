import React from 'react';

import './style.scss';

const getArrayIndexFromString = (name, arrayLength) => {
  const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return charCodeSum % arrayLength;
};

const Badge = ({ children }) => {
  const classNames = ['red', 'blue', 'yellow', 'orange', 'pink', 'purple', 'green'];
  const index = getArrayIndexFromString(children, classNames.length);

  return (
    <div className={`badge ${classNames[index]}`}>
      <span>{children}</span>
    </div>
  );
};
export default Badge;
