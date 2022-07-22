import React, { useEffect, useState, useRef } from "react";

export default function ChatWindow() {
  const [chatData, setChatData] = useState([]);
  const [chat, setChat] = useState("");
  const inputRef = useRef(null);

  const submitChat = (e) => {
    let chatMessage = e.target.value;
    if (e.key === "Enter") {
      inputRef.current.value = "";
      inputRef.current.focus();
      setChat(chatMessage);
      const message = {
        user: "Admin",
        message: "Hi!",
      };
      let newMessage = {
        user: "Admin",
        message: e.target.value,
      };
      console.log(`submitChat called! ${JSON.stringify(message)}`);
      setChatData((arr) => [...arr, message]);
      setChat("");
    }
  };
  useEffect(() => {
    // alert("useEffect fired!");
    // alert("chat is ", chat);
    const webSocket = new WebSocket("ws://localhost:8000");

    // webSocket.addEventListener("open", function (event) {
    //   webSocket.send("Hello from React!");
    // });

    // webSocket.addEventListener("message", function (event) {
    //   const data = JSON.parse(event.data);
    //   setChatData((arr) => [...arr, data]);
    // });

    // return () => {
    //   webSocket.close();
    // };
  }, [chat]);

  return (
    <div
      style={{
        minHeight: "100%",
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyItems: "flex-end",
        border: "5px #89c2d9",
        borderRadius: "10px",
        backgroundColor: "#a9d6e5",
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
          backgroundColor: "#012a4a",
          border: "1px #89c2d9",
          borderRadius: "10px",
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
      <div className="chat">
        <input
          type="text"
          className="chatBar"
          ref={inputRef}
          // onBlur={(e) => {
          //   setChat(e.target.value);
          // }}
          onKeyDown={submitChat}
        />
      </div>
    </div>
  );
}
