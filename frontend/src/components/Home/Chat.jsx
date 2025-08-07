import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatTyping from "./ChatTyping";
import axios from "axios";
import Message from "./Message";
import ChatProfile from "./ChatProfile";

import { conversationActions } from "../../../Slice/ConversationSlice";
import { socketContext } from "../../context/SocketContext";
import useGetSocketMessage from "../../context/UseGetSocketMessage";

function Chat() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.conversation);
  const [receiver, setReceiver] = useState(null);

  useGetSocketMessage();
  useEffect(() => {
    dispatch(conversationActions.setSelectedConversation(id));
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `https://chat-app-ob0w.onrender.com/message/get/${id}`,
          { withCredentials: true }
        );

        dispatch(conversationActions.setMessages(data.messages));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [id, dispatch]);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const { data } = await axios.get(
          `https://chat-app-ob0w.onrender.com/user/getUserById/${id}`,
          { withCredentials: true }
        );

        setReceiver(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUserById();
  }, [id]);

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 shadow-md">
        <ChatProfile receiver={receiver} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 mb-12">
        {messages.length > 0 ? (
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p style={{ fontSize: "18px" }}>
              It’s quiet here... Say hello and start the conversation!👋😉
            </p>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 z-10 shadow-md mt-3 bg-black">
        <ChatTyping />
      </div>
    </div>
  );
}

export default Chat;
