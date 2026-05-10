const http = require("node:http");

// manages tcp connection
// tells request that tcp should be keepAlive
const agent = http.Agent({ keepAlive: true });

// creating request object
const request = http.request({
  agent: agent,
  hostname: "localhost",
  port: 8050,
  method: "POST",
  path: "/create-post",
  headers: {
    "content-type": "application/json",
    // we can also specifiy content length , if it is not specified , data will be sent in chunks
    name: "jieun", // who is sesnding, in production i t should be a session
  },
});

// sending request by chunks
// reqquest.write()
request.end(
  JSON.stringify({ title: "this is the title", body: "studying http server" }),
);

// emitted only once
request.on("response", (response) => {
  console.log("-----STATUS-------");
  console.log(response.statusCode);

  console.log("-----HEADERS-------");
  console.log(response.headers);

  // body data is sented through stream
  response.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"));
  });

  response.on("end", () => {
    console.log("req && res ended");
  });
});
