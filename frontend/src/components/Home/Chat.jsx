import React, { useState } from "react";
import Loading from "./Loading";
import { conversationActions } from "../../../Slice/ConversationSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatTyping from "./ChatTyping";

import axios from "axios";

import Message from "./Message";
import ChatProfile from "./ChatProfile";
import UseGetSocketMessage from "../../context/UseGetSocketMessage";

function Chat() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const [messages, setmessages] = useState([]);
  const { messages } = useSelector((state) => state.conversation);
  const [loading, setLoading] = useState(true);
  const [receiver, setReceiver] = useState();
  UseGetSocketMessage();

  useEffect(() => {
    dispatch(conversationActions.setSelectedConversation(id));
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/message/get/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log("data", data.messages);

        // setmessages(data.messages);
        dispatch(conversationActions.setMessages(data.messages));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getMessages();
    const getUserById = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/user/getUserById/${id}`,
          {
            withCredentials: true,
          }
        );

        setReceiver(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserById();
  }, [id]);

  return (
    <div className="h-full flex flex-col">
      {/* Sticky Chat Profile at the Top */}
      <div className="sticky top-0 z-10 shadow-md">
        <ChatProfile receiver={receiver} />
      </div>

      {/* Messages Container (Auto-Expanding, Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 mb-12">
        {loading ? (
          <Loading />
        ) : messages.length > 0 ? (
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

      {/* Sticky Chat Typing at the Bottom */}
      <div className="sticky bottom-0 z-10 shadow-md mt-3 bg-black">
        <ChatTyping />
      </div>
    </div>
  );
}

export default Chat;
