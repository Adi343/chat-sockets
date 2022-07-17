import React, { useEffect, useState } from "react";
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
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyItems: "flex-end",
        backgroundColor: "#404040",
      }}
    >
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <span
          style={{
            fontSize: "32px",
            color: "#900000",
          }}
        >
          REACT CHAT
        </span>
      </div> */}
      <div
        style={{
          flex: "9.75",
          overflow: "auto",
          backgroundColor: "#000089",
          justifyItems: "flex-end",
        }}
      >
        {chatData.map((item) => (
          <div
            key={item.message}
            style={{
              margin: "5px",
              alignSelf: "end",
            }}
          >
            <span className="userStyle">{item.user}</span>
            <span key={item.user} className="messageStyle">
              {item.message}
            </span>
          </div>
        ))}
      </div>
      {/* <div
      // style={{ flex: "0.25" }}
      >
        <ChatInput />
      </div> */}
      <ChatInput />
    </div>
  );
}
