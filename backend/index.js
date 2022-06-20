const { WebSocketServer } = require("ws");
const { createServer } = require("http");
const express = require("express");

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something good from server...");
});
server.listen(8000, () => {
  console.log("Listening on ws://localhost:8000");
});
