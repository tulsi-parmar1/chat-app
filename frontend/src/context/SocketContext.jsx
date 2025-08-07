import { createContext, useEffect, useState } from "react";

import { useMemo } from "react";
import { io } from "socket.io-client";

export const socketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [onlineUser, setOnlineUser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const socket = useMemo(() => {
    return io("https://chat-app-ob0w.onrender.com", {
      query: { userId: user?._id },
      withCredentials: true,
    });
  }, [user?._id]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.on("getonline", (users) => {
      setOnlineUser(users);
    });
    socket.on("disconnect", () => {
      console.log("disconnncted");
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <socketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </socketContext.Provider>
  );
};
