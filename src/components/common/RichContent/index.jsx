import React, { memo } from 'react';
import { urlRegex } from '../../../utils/regex';

const getLinesFromString = (string) => string.split('\n');
const getWordsFromString = (string) => string.split(' ');
const getURL = (website) => {
  if (/^https?:/.test(website)) return website;
  return `http://${website}`;
};

const RichContent = ({ children, className }) => {
  const contentArray = getLinesFromString(children).map((line) => {
    const words = getWordsFromString(line).map((word) => {
      if (urlRegex.test(word))
        return <a target="_blank" rel="noreferrer" href={getURL(word)}>{`${word} `}</a>;
      return `${word} `;
    });

    return (
      <>
        {React.Children.toArray(words)}
        <br />
      </>
    );
  });
  return <p className={className}>{React.Children.toArray(contentArray)}</p>;
};

export default memo(RichContent);
