import webpush from "https://code4fukui.github.io/web-push/src/index.js";
//import webpush from "../../util/web-push/src/index.js";

const getVAPIDKeys = async () => {
  const fnmail = "data/mailaddress.txt";
  let mailaddress = null;
  try {
    mailaddress = "mailto:" + (await Deno.readTextFile(fnmail)).trim();
  } catch (e) {
    console.log(e);
    console.log("set your mail address in " + fnmail);
    Deno.exit(1);
  }
  const fn = "data/vapidKeys.json";
  const fnpub = "static/vapidPublicKey.txt";
  try {
    return JSON.parse(await Deno.readTextFile(fn));
  } catch (e) {
    const vapidKeys = webpush.generateVAPIDKeys();
    vapidKeys.mailaddress = mailaddress;
    await Deno.writeTextFile(fn, JSON.stringify(vapidKeys));
    await Deno.writeTextFile(fnpub, vapidKeys.publicKey);
    return vapidKeys;
  }
};

const vapidKeys = await getVAPIDKeys();
webpush.setVapidDetails(vapidKeys.mailaddress, vapidKeys.publicKey, vapidKeys.privateKey);

export const push = async (subscription, data) => {
  if (typeof subscription == "string") {
    if (subscription.endsWith(".json")) {
      subscription = subscription.substring(0, subscription.length - 5);
    }
    subscription = JSON.parse(await Deno.readTextFile("data/subscription/" + subscription + ".json"));
  }
  if (typeof data == "string") {
    data = { title: "WebPush", body: data };
  }
  await webpush.sendNotification(subscription, data);
};

const WebPush = { push };
export default WebPush;
