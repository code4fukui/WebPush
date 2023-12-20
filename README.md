# webpush

WebPush demo for Chrome, Safari, Firefox, iPhone (PWA) and Android

* iPhone PWA must have a meta tag: &lt;meta name="apple-mobile-web-app-capable" content="yes"&gt;

## setup

- setup [Deno](https://deno.land/) and [Node.js](https://nodejs.org/)


```sh
npm i
```

```sh
mkdir data
cat > data/mailaddress.txt
yourmailaddress@yourdomain
```

```sh
node push.mjs
```
- → data/vapidKeys.json
- → static/vapidPublicKey.txt

```sh
deno run -A webpushserver.js 
```

- open http://localhost:3004/
- press the "subscribe" button
- press the "push test" button
- copy the WebPush uuid

```sh
node push.mjs [uuid] test
```

## blog

- https://fukuno.jig.jp/3093

## dependencies

- [Node.js](https://nodejs.org/)
- [Deno](https://deno.land)
- [web-push](https://www.npmjs.com/package/web-push)

## reference

- https://developer.mozilla.org/en-US/docs/Web/API/notification
