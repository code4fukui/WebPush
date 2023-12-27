self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("push event", e, data);
  data.data = data;
  const timeout = data.timeout;
  const id = new Date().getTime();
  data.data.id = id;
  const show = () => {
    self.registration.showNotification(data.title, data);
    if (timeout) {
      setTimeout(async () => {
        const ns = await self.registration.getNotifications();
        for (const n of ns) {
          if (n.data.id === id) {
            n.close();
          }
        }
      }, timeout);
    }
  };
  if (data.delay) {
    setTimeout(show, data.delay);
  } else {
    show();
  }
});
self.addEventListener("notificationclick", e => {
  const url = e.notification.data.url;
  if (url) {
    console.log("openWindow", url);
    clients.openWindow(url);
  }
  e.notification.close();
});
