# WebPush on Deno

Deno上でWebPush機能を実装したデモアプリケーションです。Chrome、Safari、Firefox、iPhone (PWA)、Androidでの動作を確認できます。

## デモ
https://code4fukui.github.io/WebPush/

## 機能
- WebPush通知の配信
- WebPush通知のカスタマイズ (タイトル、本文、アイコン、URL、通知時間)
- 端末の購読/購読解除

## 必要環境
- [Deno](https://deno.land/)

## 使い方

リポジトリをクローンし、初期化スクリプトを実行してください。

```sh
git clone https://github.com/code4fukui/WebPush.git
cd WebPush
deno run -A init.js yourmailaddress@yourdomain
```

これにより、メールアドレス用のVAPID公開鍵と秘密鍵が生成されます。

次にサーバを起動します。

```sh
deno run -A server.js
```

ブラウザで http://localhost:8000/ を開き、「通知を開始」ボタンを押して購読を行います。「プッシュ通知テスト」ボタンを押すと通知が表示されます。

## ライセンス
MIT License