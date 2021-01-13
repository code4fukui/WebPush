import webPush from "web-push";
import fs from "fs";

class WebPush {
  constructor() {
    const vapidKeys = this.getVAPIDKeys();
    //console.log(vapidKeys);
    webPush.setVapidDetails(vapidKeys.mailaddress, vapidKeys.publicKey, vapidKeys.privateKey);
  }
  async push(subscription, data) {
    try {
      return webPush.sendNotification(subscription, JSON.stringify(data));
    } catch (e) {
      // can't catch!?
    }
  }
  getVAPIDKeys() {
    const fnmail = "data/mailaddress.txt";
    let mailaddress = null;
    try {
      mailaddress = "mailto:" + fs.readFileSync(fnmail, "utf-8").trim();
    } catch (e) {
      console.log(e);
      console.log("set your mail address in " + fnmail);
      process.exit(1);
    }
    const fn = "data/vapidKeys.json";
    //const fnpub = "static/vapidPublicKey.bin";
    const fnpub2 = "static/vapidPublicKey.txt";
    try {
      return JSON.parse(fs.readFileSync(fn, "utf-8"));
    } catch (e) {
      const vapidKeys = webPush.generateVAPIDKeys();
      vapidKeys.mailaddress = mailaddress;
      fs.writeFileSync(fn, JSON.stringify(vapidKeys));
      //fs.writeFileSync(fnpub, this.base64ToUint8Array(vapidKeys.publicKey));
      fs.writeFileSync(fnpub2, vapidKeys.publicKey);
      return vapidKeys;
    }
  }
  /*
  base64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
      //const rawData = window.atob(base64);
      const rawData = new Buffer(base64, "base64").toString("ascii");
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
  }
  */
};

const getParams = () => {
  const argv = process.argv;
  if (argv.length - 2 < 2) {
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
      process.exit(0);
  }
  const parseJSON = (s) => {
    try {
      return JSON.parse(s);
    } catch (e) {
      return "" + s;
    }
  };
  const subscription = parseJSON(argv[2]);
  const data = parseJSON(argv[3]);
  return { subscription, data };
};

const push = async () => {
  const webpush = new WebPush();
  let { subscription, data } = getParams();
  if (typeof subscription == "string") {
    if (subscription.endsWith(".json")) {
      subscription = subscription.substring(0, subscription.length - 5);
    }
    subscription = JSON.parse(fs.readFileSync("data/subscription/" + subscription + ".json", "utf-8"));
  }
  if (typeof data == "string") {
    data = { title: "WebPush", body: data };
  }
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
  //console.log(subscription);
  //console.log(data);
  const res = await webpush.push(subscription, data);
  console.log(JSON.stringify(res));
};
push();

/*
const vapidKeys = {
  "publicKey": 'BFe2peXxO05umvz6tiSCUIsGtLhtLl0uvvy-FjqiGlsUBxVQOQNgJ-4b3RcRKVBJ-YaqNKlOhyplulvrUSM1vuE',
  "privateKey": 'z_Mn_-OJ-aQKRmO5BLa7PAQQWYSEPz2ne1XSn379KU0'
}
*/
