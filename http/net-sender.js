const net = require("net");

const socket = net.createConnection({ host: "127.0.0.1", port: 8050 }, () => {
  const head = Buffer.from(
    "504f5354202f6372656174652d706f737420485454502f312e310d0a636f6e74656e742d747970653a206170706c69636174696f6e2f6a736f6e0d0a6e616d653a206a6965756e0d0a486f73743a206c6f63616c686f73743a383035300d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a436f6e74656e742d4c656e6774683a2035390d0a0d0a",
    "hex",
  );

  const body = Buffer.from(
    "7b227469746c65223a227468697320697320746865207469746c65222c22626f6479223a227374756479696e67206874747020736572766572227d",
    "hex",
  );

  socket.write(Buffer.concat([head, body]));
});

socket.on("data", (chunk) => {
  console.log("Received chunk");
  console.log(chunk.toString("utf-8"));
  console.log(chunk.toString("hex"));
  socket.end();
});

socket.on("end", () => {
  console.log("connection ended");
});

// ----- copy hypertext transfer protocol (it will copy only header)
// 0000   50 4f 53 54 20 2f 63 72 65 61 74 65 2d 70 6f 73   POST /create-pos
// 0010   74 20 48 54 54 50 2f 31 2e 31 0d 0a 63 6f 6e 74   t HTTP/1.1..cont
// 0020   65 6e 74 2d 74 79 70 65 3a 20 61 70 70 6c 69 63   ent-type: applic
// 0030   61 74 69 6f 6e 2f 6a 73 6f 6e 0d 0a 6e 61 6d 65   ation/json..name
// 0040   3a 20 6a 69 65 75 6e 0d 0a 48 6f 73 74 3a 20 6c   : jieun..Host: l
// 0050   6f 63 61 6c 68 6f 73 74 3a 38 30 35 30 0d 0a 43   ocalhost:8050..C
// 0060   6f 6e 6e 65 63 74 69 6f 6e 3a 20 6b 65 65 70 2d   onnection: keep-
// 0070   61 6c 69 76 65 0d 0a 43 6f 6e 74 65 6e 74 2d 4c   alive..Content-L
// 0080   65 6e 67 74 68 3a 20 35 39 0d 0a 0d 0a            ength: 59....

// ----  copy as hax stream (header)
// 504f5354202f6372656174652d706f737420485454502f312e310d0a636f6e74656e742d747970653a206170706c69636174696f6e2f6a736f6e0d0a6e616d653a206a6965756e0d0a486f73743a206c6f63616c686f73743a383035300d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a436f6e74656e742d4c656e6774683a2035390d0a0d0a

//--- copy javascript notation object (it will copy body)
// 0000   7b 22 74 69 74 6c 65 22 3a 22 74 68 69 73 20 69   {"title":"this i
// 0010   73 20 74 68 65 20 74 69 74 6c 65 22 2c 22 62 6f   s the title","bo
// 0020   64 79 22 3a 22 73 74 75 64 79 69 6e 67 20 68 74   dy":"studying ht
// 0030   74 70 20 73 65 72 76 65 72 22 7d                  tp server"}
