const http = require("http");
const fs = require("node:fs/promises");

const server = http.createServer();

server.listen(9000, () => {
  console.log("server is listening on http://localhost:9000");
});
server.on("request", async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    // 작은 Buffer 조각(chunk)들을 stream이 계속 흘려보냄
    // 메모리 사용량 적어짐
    const fileHandle = await fs.open("./public/index.html", "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(res);
  }

  if (req.url === "/styles.css" && req.method === "GET") {
    res.setHeader("Content-Type", "text/css");
    const fileHandle = await fs.open("./public/styles.css", "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(res);
  }
  if (req.url === "/script.js" && req.method === "GET") {
    res.setHeader("Content-Type", "application/javascript");
    const fileHandle = await fs.open("./public/test.js", "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(res);
  }
  if (req.url === "/login" && req.method === "POST") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    const body = {
      message: "login you in...",
    };

    res.end(JSON.stringify(body));
  }

  if (req.url === "/user" && req.method === "PUT") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 401;

    const body = {
      message: "Login first",
    };

    res.end(JSON.stringify(body));
  }
});
