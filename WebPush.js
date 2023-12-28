import webpush from "https://code4fukui.github.io/web-push/src/index.js";
//import webpush from "../../util/web-push/src/index.js";

const getVAPIDKeys = async () => {
  const fn = "data/vapidKeys.json";
  return JSON.parse(await Deno.readTextFile(fn));
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
