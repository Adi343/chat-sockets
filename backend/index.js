const { WebSocketServer } = require("ws");
const { createServer } = require("http");
const express = require("express");
const fs = require("fs");

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const data = JSON.parse(fs.readFileSync("./data.json"));

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });

  let count = 0;

  const interval = setInterval(() => {
    ws.send(JSON.stringify(data[count]));
    count += 1;
    if (count >= data.length) {
      clearInterval(interval);
    }
    return;
  }, 1000);
});
server.listen(8000, () => {
  console.log("Listening on ws://localhost:8000");
});
