import './style.scss';
import { useEffect, useState } from 'react';
import useNetworkStatus from '../../../hooks/useNetworkStatus';

const OfflineBanner = () => {
  const isDeviceOffline = useNetworkStatus();
  const [isBannerVisible, setBannerVisibility] = useState(isDeviceOffline);

  useEffect(() => {
    let timer = null;

    // Show Online banner for 2 seconds
    if (!isDeviceOffline) {
      timer = setTimeout(() => setBannerVisibility(false), 2000);
    }
    // Show Offline banner
    else {
      setBannerVisibility(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isDeviceOffline]); // eslint-disable-line

  return isBannerVisible ? (
    <div className={`device-status-banner ${isDeviceOffline ? 'offline-banner' : 'online-banner'}`}>
      <span>{isDeviceOffline ? 'You are currently offline' : 'Back Online'}</span>
    </div>
  ) : (
    <></>
  );
};

export default OfflineBanner;
