const net = require("net");

const server = net.createServer((socket) => {
  // reads connection
  socket.on("data", (data) => {
    console.log(data);
  });
});

server.listen(3099, "127.0.0.1", () => {
  console.log("server opened");
});
