import { useCallback, useEffect, useState } from 'react';

const useMediaQuery = (mediaQuery) => {
  const [doesQueryMatch, setDoesQueryMatch] = useState(() => window.matchMedia(mediaQuery).matches);

  const mediaQueryEventHandler = useCallback(
    (e) => {
      if (e.matches !== doesQueryMatch) setDoesQueryMatch(e.matches);
    },
    [doesQueryMatch]
  );

  useEffect(() => {
    window.matchMedia(mediaQuery).addEventListener('change', mediaQueryEventHandler);

    return () => {
      window.matchMedia(mediaQuery).removeEventListener('change', mediaQueryEventHandler);
    };
  }, [mediaQueryEventHandler, mediaQuery]);

  return doesQueryMatch;
};

export default useMediaQuery;
