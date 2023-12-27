import { serveAPI } from "https://js.sabae.cc/wsutil.js";
import { UUID } from "https://code4sabae.github.io/js/UUID.js";
import WebPush from "./WebPush.js";

await Deno.mkdir("data/subscription", { recursive: true });

serveAPI("/api/", async (param, req, path, conninfo) => {
  if (path == "/api/subscribe") {
    try {
      const subscription = JSON.stringify(param);
      const uuid = UUID.generate();
      await Deno.writeTextFile("data/subscription/" + uuid + ".json", subscription);
      console.log("subscribe", uuid);
      return { uuid };
    } catch (e) {
      console.log(e);
    }
  }
  if (path == "/api/unsubscribe") {
    try {
      const uuid = param.uuid;
      console.log("unsubscribe", uuid);
      await Deno.remove("data/subscription/" + uuid + ".json");
      return { uuid };
    } catch (e) {
      console.log(e);
    }
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
