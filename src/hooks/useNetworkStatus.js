import { useEffect, useState } from 'react';

const useNetworkStatus = () => {
  const [isDeviceOffline, setDeviceOffline] = useState(false);
  useEffect(() => {
    const networkStatusListener = () => {
      setDeviceOffline(!navigator.onLine);
    };

    window.addEventListener('online', networkStatusListener);
    window.addEventListener('offline', networkStatusListener);

    return () => {
      window.removeEventListener('online', networkStatusListener);
      window.removeEventListener('offline', networkStatusListener);
    };
  }, []); // eslint-disable-line

  return isDeviceOffline;
};

export default useNetworkStatus;
