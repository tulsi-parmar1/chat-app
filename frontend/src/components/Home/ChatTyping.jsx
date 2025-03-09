import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoSend } from "react-icons/io5";
import { conversationActions } from "../../../Slice/ConversationSlice.js";
import { socketContext } from "../../context/SocketContext.jsx";

function ChatTyping() {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const { socket } = useContext(socketContext);
  const [message, setMessage] = useState("");

  const { messages } = useSelector((state) => state.conversation);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const senderId = user._id;

    socket.emit("sendMessage", {
      senderId,
      receiverId: selectedConversation,
      message,
    });
    socket.on("messageSent", (data) => {
      dispatch(conversationActions.setMessages([...messages, data]));
      console.log(messages, data);
    });
    setMessage("");
  };

  return (
    <div>
      <div className="fixed bottom-3 flex items-center w-full bg-black pt-4 pb-2">
        <input
          type="text"
          placeholder="Type here"
          className="input w-full"
          style={{ width: "75%" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="ml-3">
          <IoSend size={24} onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatTyping;
