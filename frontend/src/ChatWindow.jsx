import React, { useEffect, useState, useLayoutEffect } from "react";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  const [chatData, setChatData] = useState([]);
  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:8000");

    // webSocket.addEventListener("open", function (event) {
    //   webSocket.send("Hello from React!");
    // });

    webSocket.addEventListener("message", function (event) {
      const data = JSON.parse(event.data);
      setChatData((arr) => [...arr, data]);
    });

    return () => {
      webSocket.close();
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#404040",
      }}
    >
      <span
        style={{
          alignItems: "center",
        }}
      >
        This is chat
      </span>
      <div style={{ flex: "1" }}>
        {chatData.map((item) => (
          <div
            style={{
              margin: "5px",
            }}
          >
            <span
              style={{
                marginLeft: "5px",
                marginRight: "10px",
                fontSize: "20px",
                color: "orange",
              }}
            >
              {item.user}
            </span>
            <span
              key={item.user}
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                fontSize: "20px",
              }}
            >
              {item.message}
            </span>
          </div>
        ))}
      </div>
      <ChatInput />
    </div>
  );
}
