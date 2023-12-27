# WebPush on Deno

WebPush on Deno demo for Chrome, Safari, Firefox, iPhone (PWA) and Android

* iPhone PWA must have a meta tag:
```html
<meta name="apple-mobile-web-app-capable" content="yes">
```

## setup

- setup [Deno](https://deno.land/)

```sh
git clone https://github.com/code4fukui/WebPush.git
cd WebPush
```

```sh
mkdir data
cat > data/mailaddress.txt
yourmailaddress@yourdomain
```

```sh
deno run -A push.js
```
- → data/vapidKeys.json
- → static/vapidPublicKey.txt

```sh
deno run -A webpushserver.js 
```

- open http://localhost:8000/
- press the "subscribe" button
- press the "push test" button
- copy the WebPush uuid

```sh
deno run -A push.js [uuid] test
```

## blog

- https://fukuno.jig.jp/4171

## dependencies

- [Deno](https://deno.land)
- [web-push for Deno](https://github.com/code4fukui/web-push/) forked from [web-push](https://www.npmjs.com/package/web-push)

## reference

- https://developer.mozilla.org/en-US/docs/Web/API/notification
