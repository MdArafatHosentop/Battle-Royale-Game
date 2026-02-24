const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

let players = {};

io.on("connection", socket => {
  players[socket.id] = {
    x: 0,
    y: 2,
    z: 0
  };

  socket.on("move", data => {
    players[socket.id] = data;
    io.emit("players", players);
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
