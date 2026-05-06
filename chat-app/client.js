const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};
const socket = net.createConnection(
  { host: "127.0.0.1", port: 3008 },
  async () => {
    const ask = async () => {
      const msg = await rl.question("333 Enter a question > ");
      // move cursor to the top
      await moveCursor(0, -1);
      // clear cursor
      await clearLine(0);
      // 4. 클라이언트가 메시지 입력, 서버로 전송됨
      socket.write(msg);
    };

    ask();

    // 6. 클라이언트 화면에 재출력
    socket.on("data", async (data) => {
      // move cursor one line up and delete the log
      await moveCursor(0, -1);
      await clearLine(0);
      console.log(data.toString("utf-8"));
      // ask again
      ask();
    });
  },
);

// socket is closed
socket.on("close", () => {
  console.log("44444 closed!");
});

// server finished reading stream
socket.on("end", () => {
  console.log("44444 connection was ended ");
});
