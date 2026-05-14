# WebPush on Deno

Denoで構築された、Chrome、Safari、Firefox、iPhone (PWA)、Android向けのWebPushデモです。

## 特徴
- Chrome、Safari、Firefox、iPhone (PWA)、Android向けのプッシュ通知をサポート
- iPhone PWAのサポートには以下のメタタグが必要です:
  ```html
  <meta name="apple-mobile-web-app-capable" content="yes">
  ```
- WebPushサーバーおよびクライアントをセットアップするためのサンプルコードを同梱

## 要件
- [Deno](https://deno.land/)

## 使い方
1. リポジトリをクローンします:
   ```sh
   git clone https://github.com/code4fukui/WebPush.git
   cd WebPush
   ```
2. VAPIDキーをセットアップします:
   ```sh
   deno run -A init.js yourmailaddress@yourdomain
   ```
   これにより、`data/vapidKeys.json` と `static/vapidPublicKey.txt` ファイルが作成されます。
3. サーバーを起動します:
   ```sh
   deno run -A server.js
   ```
4. デモサイト [http://localhost:8000/](http://localhost:8000/) を開きます。
5. 「subscribe」ボタンをクリックして、プッシュ通知を購読します。
6. 「push test」ボタンをクリックして、テスト用のプッシュ通知を送信します。
7. WebPush UUIDをコピーし、コマンドラインからプッシュ通知を送信します:
   ```sh
   deno run -A push.js [uuid] test
   ```

## ブログ
- [WebPush on Deno](https://fukuno.jig.jp/4171)

## 依存関係
- [Deno](https://deno.land)
- [web-push for Deno](https://github.com/code4fukui/web-push/) （[web-push](https://www.npmjs.com/package/web-push) からのフォーク）

## 参考資料
- [Web Push Protocol | web.dev](https://web.dev/articles/push-notifications-web-push-protocol?hl=ja)
- [Notification - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/notification)
- [draft-ietf-webpush-encryption-09](https://datatracker.ietf.org/doc/html/draft-ietf-webpush-encryption)

## ライセンス
MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
