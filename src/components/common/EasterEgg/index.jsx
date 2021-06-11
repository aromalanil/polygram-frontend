/* eslint-disable  no-console */
import { memo } from 'react';

function consoleWithoutSource(...args) {
  setTimeout(console.log.bind(console, ...args));
}

const EasterEgg = () => {
  if (process.env.NODE_ENV === 'production') {
    consoleWithoutSource(
      '%cThey are here',
      `background-color: #151A26; 
     padding: 5px;
     font-size: 30px;
     border-left: 5px solid #7D71FE`
    );
    consoleWithoutSource(
      '%c+',
      `padding: 60px 110px; 
     line-height: 50px; 
     background: url(https://i.imgur.com/gbHzjkD.gif);`
    );
  }

  return null;
};

export default memo(EasterEgg);
