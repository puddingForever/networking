const http = require("node:http");
const fs = require("node:fs/promises");

class Butter {
  // 서버 생성
  constructor() {
    this.server = http.createServer();
    /*
     {
      "get /" : () => {},
      "post /upload" : () => {}
      }
    */
    this.routes = {};
    this.server.on("request", (req, res) => {
      res.sendFile = async (path, mime) => {
        res.setHeader("Content-Type", mime);
        const fileHandle = await fs.open(path, "r");
        const fileStream = fileHandle.createReadStream();

        fileStream.pipe(res);
      };
      this.routes[req.method.toLowerCase() + req.url](req, res);
    });
  }

  // routing
  route(method, route, cb) {
    this.routes[method.toLowerCase() + route] = cb;
  }

  // listen
  listen(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }
}

module.exports = Butter;
