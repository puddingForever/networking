const Butter = require("./butter");

const server = new Butter();
const PORT = 4060;
server.listen(PORT, () => {
  console.log("Server listening on", PORT);
});

server.route("GET", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});
