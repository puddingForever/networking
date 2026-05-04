const net = require("net");

const server = net.createServer();

const clients = [];

server.listen(3008, "127.0.0.1", () => {
  console.log("111 server opened", server.address());
});

// 클라이언트가 연결되면 실행
server.on("connection", (socket) => {
  console.log("222connected completed!");
  // 5. 서버에서 클라이언트가 전송한 데이터를 받아서 다시 돌려준다 (echo)
  socket.on("data", (data) => {
    clients.map((s) => s.write(data));
  });

  clients.push(socket);
});
