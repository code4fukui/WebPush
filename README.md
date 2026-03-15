# WebPush on Deno

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

WebPush demo for Chrome, Safari, Firefox, iPhone (PWA), and Android, built on Deno.

## Features
- Supports push notifications for Chrome, Safari, Firefox, iPhone (PWA), and Android
- Requires a meta tag for iPhone PWA support:
  ```html
  <meta name="apple-mobile-web-app-capable" content="yes">
  ```
- Includes example code for setting up the WebPush server and client

## Requirements
- [Deno](https://deno.land/)

## Usage
1. Clone the repository:
   ```sh
   git clone https://github.com/code4fukui/WebPush.git
   cd WebPush
   ```
2. Set up the VAPID keys:
   ```sh
   deno run -A init.js yourmailaddress@yourdomain
   ```
   This will create the `data/vapidKeys.json` and `static/vapidPublicKey.txt` files.
3. Start the server:
   ```sh
   deno run -A server.js
   ```
4. Open the demo site at [http://localhost:8000/](http://localhost:8000/).
5. Click the "subscribe" button to subscribe to push notifications.
6. Click the "push test" button to send a test push notification.
7. Copy the WebPush UUID and use it to send a push notification from the command line:
   ```sh
   deno run -A push.js [uuid] test
   ```

## Blog
- [WebPush on Deno](https://fukuno.jig.jp/4171)

## Dependencies
- [Deno](https://deno.land)
- [web-push for Deno](https://github.com/code4fukui/web-push/) forked from [web-push](https://www.npmjs.com/package/web-push)

## Reference
- [Web Push Protocol | web.dev](https://web.dev/articles/push-notifications-web-push-protocol?hl=ja)
- [Notification - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/notification)
- [draft-ietf-webpush-encryption-09](https://datatracker.ietf.org/doc/html/draft-ietf-webpush-encryption)

## License
MIT License