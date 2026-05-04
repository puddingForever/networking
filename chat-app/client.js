const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = net.createConnection(
  { host: "127.0.0.1", port: 3008 },
  async () => {
    const msg = await rl.question("333 Enter a question > ");
    // 4. 클라이언트가 메시지 입력, 서버로 전송됨
    socket.write(msg);
  },
);

// 6. 클라이언트 화면에 재출력
socket.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

// socket is closed
socket.on("close", () => {
  console.log("44444 closed!");
});

// server finished reading stream
socket.on("end", () => {
  console.log("44444 connection was ended ");
});
