/* eslint-disable  no-console */
import { memo, useEffect } from 'react';
import { DEVELOPERS_IMAGE } from './developersImage';

function consoleWithoutSource(...args) {
  setTimeout(console.log.bind(console, ...args));
}

let hasLogged = false;

const EasterEgg = () => {
  useEffect(() => {
    if (hasLogged) return;
    hasLogged = true;

    consoleWithoutSource(
      '%cThey are here!',
      `background-color: #151A26; 
       color: #7D71FE;
       padding: 8px 12px;
       font-size: 20px;
       font-weight: bold;
       border-left: 5px solid #7D71FE;
       border-radius: 4px;`
    );
    consoleWithoutSource(
      '%c ',
      `padding: 30px 40px; 
       line-height: 60px; 
       background-image: url(${DEVELOPERS_IMAGE});
       background-size: contain;
       background-repeat: no-repeat;`
    );
  }, []);

  return null;
};

export default memo(EasterEgg);
