import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { conversationActions } from "../../../Slice/ConversationSlice";
// import UseGetSocketMessage from "../../context/UseGetSocketMessage.jsx";

function ChatTyping() {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.conversation);

  const handleSendMessage = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/message/send/${selectedConversation}`,
        { messages },
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="fixed bottom-3 flex  items-center w-full bg-black pt-4 pb-2 ">
        <input
          type="text"
          placeholder="Type here"
          className="input w-full"
          style={{ width: "75%" }}
          onChange={(e) =>
            dispatch(conversationActions.setMessages(e.target.value))
          }
        />
        <div className="ml-3">
          <IoSend size={24} onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatTyping;
