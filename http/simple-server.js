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

  let name = req.headers.name;
  let data = "";

  // server gets body in streams
  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  req.on("end", () => {
    data = JSON.parse(data);

    // response
    res.writeHead(200, { "Content-Type": "application/json" });
    // when communicating on http
    // server cant ready js object, so we convert it to string (json)
    res.end(
      JSON.stringify({
        message: `server got ${JSON.stringify(data)} created by ${name}`,
      }),
    );
  });
});

server.listen(8050, () => {
  console.log("server listening on http://localhost:8050");
});
