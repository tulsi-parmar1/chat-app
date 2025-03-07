// import { createContext, useContext, useEffect, useState } from "react";
// import io from "socket.io-client";
// import { useDispatch, useSelector } from "react-redux";
// import { conversationActions } from "../../Slice/ConversationSlice";
// const SocketContext = createContext();

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// // export const SocketProvider = ({ children }) => {
// //   const dispatch = useDispatch();
// //   // const { socket } = useSelector((state) => state.conversation);
// //   const [socket, setSocket] = useState(null);
// //   const [onlineUser, setOnlineUser] = useState([]);
// //   const user = JSON.parse(localStorage.getItem("user"));

// //   useEffect(() => {
// //     // Check if user exists before establishing socket connection
// //     if (user && !socket) {
// //       const socketInstance = io("http://localhost:4000", {
// //         query: {
// //           userId: user._id,
// //         },
// //       });
// //       setSocket(socketInstance);
// //       // dispatch(conversationActions.setSocket(socketInstance));

// // Listen for online users

// //       // Clean up the socket connection on component unmount
// //       return () => {
// //         socketInstance.close();
// //       };
// //     }

// //     // Disconnect socket if user is not logged in
// //     if (!user && socket) {
// //       socket.close();
// //       //   setSocket(null);
// //       dispatch(conversationActions.setSocket(null));
// //     }
// //   }, [user, socket]); // Ensure useEffect runs when user or socket changes

// //   return (
// //     <socketContext.Provider value={{ socket, onlineUser }}>
// //       {children}
// //     </socketContext.Provider>
// //   );
// // };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUser, setOnlineUser] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));
//   // const [message,setMessages]=useState([]);
//   const dispatch = useDispatch();
//   const { messages } = useSelector((state) => state.conversation);

//   useEffect(() => {
//     if (user) {
//       const socket = io("http://localhost:4000", {
//         query: {
//           userId: user._id,
//         },
//       });
//       setSocket(socket); //new
//       // newSocket.on("connect", () => {
//       //   console.log("✅ Connected to socket", newSocket.id);
//       //   setSocket(newSocket); // ✅ Update socket state only after successful connection
//       // });
//       socket.on("getonline", (users) => {
//         console.log("getonline action emit", users);
//         setOnlineUser(users);
//       });
//       // newSocket.on("newMessage", (newMessage) => {
//       //   console.log("new message", newMessage);
//       //   // setMessages(message);
//       //   dispatch(conversationActions.setMessages([...messages, newMessage]));
//       // });

//       // newSocket.on("disconnect", () => {
//       //   console.log("❌ Socket disconnected");
//       //   setSocket(null);
//       // });
//       return () => {
//         socket.close();
//       };
//     } else if (socket) {
//       socket.close();
//       setSocket(null);
//     }
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket, onlineUser }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
import { createContext, useContext, useEffect, useState } from "react";

import io from "socket.io-client";
const socketContext = createContext();

// it is a hook.
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const authUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:4000", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);
      socket.on("getonline", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
