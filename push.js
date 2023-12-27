import * as WebPush from "./WebPush.js";

const getParams = () => {
  if (Deno.args.length < 2) {
      console.log("push.mjs [subscription(json)] [data(json)]");
      const subscription = {
        "endpoint": "https://fcm.googleapis.com/fcm/send/fgeD9VHBnwk:APA91bG63RKQCn2JAHIpPhAaqDyIY87702TYDWX3SV1Ik22sbDHPY0twLKBR889v3VL1j5lxUkus2WT2uxErCcNWo8q_1rTSil4O78YwLqkJ8gr87hXEDui6E7R59mhNsk3_pGga4cds",
        "expirationTime": null,
        "keys": {
          "p256dh": "BEk0orTQy1vgwRSgzDkMr0XS1vIig_a_29_lR7OhGYTGpbOEYmbKhWXbYt5VS3hACDQtKVFoaazLb7A0PysTmB8",
          "auth": "rcpvDGRU9RQbBCa1jPETLw"
        }
      };
      const data = {
          title: "Web Push通知テスト",
          body: "通知 5秒",
          // icon: "./test.png",
          // badge: "./test.png"
          url: "http://localhost:3003/",
          timeout: 5000,
      };
      console.log("-- example");
      console.log(JSON.stringify(subscription, null, 2));
      console.log(JSON.stringify(data, null, 2));
      Deno.exit(0);
  }
  const parseJSON = (s) => {
    try {
      return JSON.parse(s);
    } catch (e) {
      return "" + s;
    }
  };
  const subscription = parseJSON(Deno.args[0]);
  const data = parseJSON(Deno.args[1]);
  return { subscription, data };
};

/*
const subscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/f-E1z4FZCqs:APA91bEBsfwFyQjoP7JdQw3MZq4r4YO5KdPJRKP9rWJh8tGrjy5YMYyxDU_bM1cYcuBuYSGKvr9ngwDqasLO6SaQXk2OLUirmRAMqAcilIkjZxPwexPoD5EtjKyccHgTfuKa7XlnkD_i","expirationTime":null,"keys":{"p256dh":"BGxMxPPW2vQiNyL8dke8do6wOz0GoehA8t-WZwp6d2KZ9o8B5yQQlUQC53gjSW3aUtwPTffOwd6AqOTtoFwIDng","auth":"-4TGAyAlKpCbUDCpIYGtRA"}};
const data = {
    title: "Web Push 通知テスト",
    body: "通知 5秒",
    // icon: "./test.png",
    // badge: "./test.png"
    url: "http://localhost:3004/",
    timeout: 5000,
};
*/

const { subscription, data } = getParams();
await WebPush.push(subscription, data);
