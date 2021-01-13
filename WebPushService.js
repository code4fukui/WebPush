
class WebPushService {
  constructor() {
    const 
  }
  api(path, req) {

  }
}

export { WebPushService };

class MyServer extends Server {
  api(path, req) {
    /*
    if (req) {
      const d = req; // .data;
      push(d.deviceToken, d.title, d.body)
      return { res: "ok" };
    }
    */
    console.log(req);
    return { res: "err" };
  }
}
new MyServer(3003);

/*
http://localhost:8883/
http://localhost:8883/api/?{deviceToken:"abc",title:"title",body:"body"}
*/
