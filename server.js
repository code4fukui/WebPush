import { serveAPI } from "https://js.sabae.cc/wsutil.js";
import WebPush from "./WebPush.js";
import { UUID } from "https://code4sabae.github.io/js/UUID.js";

await Deno.mkdir("data/subscription", { recursive: true });

serveAPI("/api/", async (param, req, path, conninfo) => {
  if (path == "/api/subscribe") {
    const subscription = param;
    const uuid = UUID.generate();
    await Deno.writeTextFile("data/subscription/" + uuid + ".json", JSON.stringify(subscription));
    console.log("subscribe", uuid);
    return { uuid };
  }
  if (path == "/api/unsubscribe") {
    const uuid = param.uuid;
    await Deno.remove("data/subscription/" + uuid + ".json");
    console.log("unsubscribe", uuid);
    return { uuid };
  }
  if (path == "/api/push") {
    try {
      const uuid = param.uuid;
      const data = param.data;
      console.log("push", uuid, data);
      const res = await WebPush.push(uuid, data);
      return { res };
    } catch (e) {
      console.log(e);
    }
  }
  return { res: "err" };
});
