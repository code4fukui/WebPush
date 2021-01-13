import { Server } from "https://code4sabae.github.io/js/Server.js";
import { UUID } from "https://code4sabae.github.io/js/UUID.js";
import { push } from "./push_cmd.js";

await Deno.mkdir("data/subscription", { recursive: true });

class MyServer extends Server {
  async api(path, req) {
    if (path == "/api/subscribe") {
      try {
        const subscription = JSON.stringify(req);
        const uuid = UUID.generate();
        await Deno.writeTextFile("data/subscription/" + uuid + ".json", subscription);
        console.log(uuid);
        return { uuid };
      } catch (e) {
        console.log(e);
      }
    }
    if (path == "/api/unsubscribe") {
      try {
        console.log(req);
        const uuid = req.uuid;
        console.log(uuid);
        await Deno.remove("data/subscription/" + uuid + ".json");
        return { uuid };
      } catch (e) {
        console.log(e);
      }
    }
    if (path == "/api/push") {
      try {
        const uuid = req.uuid;
        const data = req.data;
        return push(uuid, data);
        return { uuid };
      } catch (e) {
        console.log(e);
      }
    }
    return { res: "err" };
  }
}
new MyServer(3004);
