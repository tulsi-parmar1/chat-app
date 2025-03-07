import React, { useEffect, useRef } from "react";

function Message({ message }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const itsme = user._id === message.senderId;
  const chatColor = itsme && "bg-teal-900";
  const messageRef = useRef(null);
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);
  return (
    <div>
      <div className={`chat ${itsme ? "chat-end" : "chat-start"}`}>
        <div className={`chat-bubble ${itsme ? chatColor : ""} `}>
          {" "}
          {message.message}
          <div ref={messageRef} />
        </div>
      </div>
    </div>
  );
}

export default Message;
