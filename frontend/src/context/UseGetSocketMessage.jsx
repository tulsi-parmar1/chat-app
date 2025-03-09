import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socketContext } from "./SocketContext";
import { conversationActions } from "../../Slice/ConversationSlice";

export default function useGetSocketMessage() {
  const dispatch = useDispatch();
  const { socket } = useContext(socketContext);
  const { messages } = useSelector((state) => state.conversation);
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      dispatch(conversationActions.addMessage(data));
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  return null;
}
