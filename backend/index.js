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

  ws.on("close", () => {
    console.log("Connection closed");
  });

  let count = 0;

  const interval = setInterval(() => {
    ws.send("something good from server...");
    count += 1;
    if (count >= 10) {
      clearInterval(interval);
    }
    return;
  }, 1000);
});
server.listen(8000, () => {
  console.log("Listening on ws://localhost:8000");
});
