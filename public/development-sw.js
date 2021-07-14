/* eslint-disable */

self.addEventListener('push', (event) => {
  if (event.data) {
    const payload = JSON.parse(event.data.text());
    const { title, body } = payload;
    event.waitUntil(
      self.registration.showNotification(title, {
        body,
        icon: '/favicons/android-chrome-512x512.png',
      })
    );
  } else {
    console.log('Event does not contain any data');
  }
});
