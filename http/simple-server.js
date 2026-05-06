const http = require("node:http");

const server = http.createServer();

// when server gets request
server.on("request", (req, res) => {
  console.log("-----method-------");
  console.log(req.method);
  console.log("-----url-------");
  console.log(req.url);
  console.log("-----headers-------");
  console.log(req.headers);
  console.log("-----body-------");

  // server gets body in streams
  req.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"));
  });
});

server.listen(8050, () => {
  console.log("server listening on http://localhost:8050");
});
