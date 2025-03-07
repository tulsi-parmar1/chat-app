// import React, { useEffect } from "react";
// import { useSocket } from "./socketContext.jsx";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { conversationActions } from "../../Slice/ConversationSlice.js";

// function UseGetSocketMessage() {
//   const dispatch = useDispatch();
//   const { socket } = useSocket();
//   const { messages } = useSelector((state) => state.conversation);

//   console.log("ye tera", socket);

//   useEffect(() => {
//     socket.on("newMessage", (NewMessage) => {
//       console.log("new message arrived", NewMessage);
//       dispatch(conversationActions.setMessages([...messages, NewMessage]));
//     });
//     return () => socket.off("newMessage");
//   }, [socket, dispatch]);
//   return <div></div>;
// }

// export default UseGetSocketMessage;
import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { conversationActions } from "../../Slice/ConversationSlice.js";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      dispatch(conversationActions.setMessages([...messages, newMessage]));
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessage]);
};
export default useGetSocketMessage;
