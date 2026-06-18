import { useEffect } from 'react';
import { useRhinoValue } from 'react-rhino';
import { subscribeForPushNotification } from '../api/notification';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const subscribeUser = async () => {
  const vapidKey = import.meta.env.REACT_APP_PUBLIC_VAPID_KEY;
  if (!vapidKey) {
    console.error('VAPID public key is missing'); // eslint-disable-line no-console
    return;
  }

  try {
    const serviceWorker = await navigator.serviceWorker.ready;

    // Subscribing the user for push notification
    const subscription = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    });

    if (subscription) {
      const subscribed = await subscribeForPushNotification(JSON.stringify(subscription));

      if (subscribed) {
        localStorage.setItem('isUserSubscribed', 'true');
      }
    }
  } catch (err) {
    console.error('Error subscribing to push notifications:', err); // eslint-disable-line no-console
  }
};

const usePushNotification = () => {
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');

  useEffect(() => {
    const initPush = async () => {
      if (!('Notification' in window) || !('serviceWorker' in navigator)) {
        return;
      }

      if (Notification.permission === 'denied') {
        return;
      }

      if (isUserLoggedIn) {
        const isUserSubscribed = localStorage.getItem('isUserSubscribed') === 'true';

        if (!isUserSubscribed) {
          if (Notification.permission !== 'granted') {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
              return;
            }
          }
          await subscribeUser();
        }
      }
    };

    initPush();
  }, [isUserLoggedIn]);
};

export default usePushNotification;
