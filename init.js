import webpush from "https://code4fukui.github.io/web-push/src/index.js";

const init = async (mail) => {
  await Deno.mkdir("data/subscription", { recursive: true });
  if (!mail) {
    console.log("set your mail address");
    return;
  }
  const fn = "data/vapidKeys.json";
  const fnpub = "static/vapidPublicKey.txt";
  try {
    const data = JSON.parse(await Deno.readTextFile(fn));
    console.log("already initilized data/vapidKeys.json");
    return;
  } catch (e) {
    const vapidKeys = webpush.generateVAPIDKeys();
    vapidKeys.mailaddress = "mailto:" + mail;
    await Deno.writeTextFile(fn, JSON.stringify(vapidKeys));
    await Deno.writeTextFile(fnpub, vapidKeys.publicKey);
    console.log("initilized!");
  }
};
init(Deno.args[0]);
