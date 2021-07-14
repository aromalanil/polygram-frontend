import { useEffect } from 'react';
import { useRhinoValue } from '../global/state';
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
  let subscription;
  try {
    const serviceWorker = await navigator.serviceWorker.ready;

    // Subscribing the user for push notification
    subscription = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY),
    });
  } catch (err) {
    console.log('Error getting subscription for notification'); // eslint-disable-line no-console
  }

  try {
    const subscribed = await subscribeForPushNotification(JSON.stringify(subscription));

    if (subscribed) {
      localStorage.setItem('isUserSubscribed', true);
    }
  } catch (err) {
    console.log('Error subscribing to push notifications'); // eslint-disable-line no-console
  }
};

const usePushNotification = () => {
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');

  useEffect(() => {
    // Asking permission from user to show push notification
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      const isUserSubscribed = JSON.parse(localStorage.getItem('isUserSubscribed'));

      if (!isUserSubscribed) {
        subscribeUser();
      }
    }
  }, [isUserLoggedIn]);
};

export default usePushNotification;
