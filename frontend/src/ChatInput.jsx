import React, { useState } from "react";

export default function ChatInput() {
  const [chatData, setChatData] = useState("");

  const submitChat = () => {
    setChatData("");
  };
  return (
    <div className="chat">
      <input
        placeholder={chatData}
        className="chatBar"
        onBlur={(e) => {
          setChatData(e.target.value);
        }}
      />
      <button onClick={submitChat}>Send</button>
    </div>
  );
}
