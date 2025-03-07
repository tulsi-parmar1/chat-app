// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// //real time messages
// export const getReceiverSocketId = (receiverId) => {
//   return users[receiverId];
// };

// const users = {};
// io.on("connection", (socket) => {
//   console.log("client connected ", socket.id);
//   const userid = socket.handshake.query.userId;
//   console.log("userid", userid);
//   if (userid) {
//     users[userid] = socket.id;
//     console.log("users", users);
//   }

//   io.emit("getonline", Object.keys(users));
//   socket.on("disconnect", () => {
//     console.log("client disconnected", socket.id);
//     delete users[userid];
//     io.emit("getonline", Object.keys(users));
//   });
// });

// export { app, io, server };
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

// used to listen events on server side.
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Hello ", users);
  }
  // used to send the events to all connected users
  io.emit("getonline", Object.keys(users));

  // used to listen client side events emitted by server side (server & client)
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
