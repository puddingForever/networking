const http = require("node:http");

// manages tcp connection
// tells request that tcp should be keepAlive
const agent = http.Agent({ keepAlive: true });

const request = http.request({
  agent: agent,
  hostname: "localhost",
  port: 8050,
  method: "POST",
  path: "/create-post",
  headers: {
    "content-type": "application/json",
    // we can also specifiy content length , if it is not specified , data will be sent in chunks
  },
});

// emitted only once
request.on("response", () => {});

request.write(JSON.stringify({ message: "TODAY I FEEL SUCKS" }));
request.write(JSON.stringify({ message: "WHY I MET A BF LIKE HIM?" }));
request.write(
  JSON.stringify({ message: "I FEEL LIKE I HATE HIM HE IS SUCH A FAILURE" }),
);

request.end(
  JSON.stringify({ message: "THOUGH I FEEL NOT GOOD TO WRITE ABOUT IT" }),
);
