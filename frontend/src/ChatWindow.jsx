import React, { useEffect } from "react";

export default function ChatWindow() {
  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:8000");

    // webSocket.addEventListener("open", function (event) {
    //   webSocket.send("Hello from React!");
    // });

    webSocket.addEventListener("message", function (event) {
      console.log("Message from server ", event.data);
    });

    return () => {
      webSocket.close();
    };
  }, []);

  return (
    <>
      <span>This is chat</span>
    </>
  );
}
