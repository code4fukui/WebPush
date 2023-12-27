import { serveAPI } from "https://js.sabae.cc/wsutil.js";
import WebPush from "./WebPush.js";

await Deno.mkdir("data/subscription", { recursive: true });

serveAPI("/api/", async (param, req, path, conninfo) => {
  if (path == "/api/subscribe") {
    const subscription = param;
    const uuid = WebPush.subscribe(subscription);
    console.log("subscribe", uuid);
    return uuid;
  }
  if (path == "/api/unsubscribe") {
    const uuid = param.uuid;
    console.log("unsubscribe", uuid);
    return WebPush.unsubscribe(uuid);
  }
  if (path == "/api/push") {
    try {
      const uuid = param.uuid;
      const data = param.data;
      console.log("push", uuid, data);
      return await WebPush.push(uuid, data);
    } catch (e) {
      console.log(e);
    }
  }
  return { res: "err" };
});
