const push = async (subscription, data) => {
  const p = Deno.run({
    cmd: [ "node", "push.mjs", JSON.stringify(subscription), JSON.stringify(data) ],
    stdout: "piped",
    stderr: "piped"
  });
  let res = null;
  try {
    const sres = new TextDecoder().decode(await p.output());
    console.log(sres);
    res = JSON.parse(sres);
  } catch (e) {
    console.log("push_cmd.js", e);
  }
  p.close();
  return res;
};
export { push };

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
const res = await push(subscription, data);
console.log("cmdres: " + res);
*/
/*
const subscription = "9e8ba759-eba3-4333-b6a4-a8398714931e";
const data = {
    title: "Web Push 通知テスト",
    body: "通知 5秒",
    // icon: "./test.png",
    // badge: "./test.png"
    url: "http://localhost:3004/",
    timeout: 5000,
};
const res = await push(subscription, data);
console.log("cmdres: " + res);
*/
