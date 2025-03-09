import { Server } from "socket.io";
import http from "http";
import express from "express";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  console.log("userid", userId);
  if (userId) {
    users[userId] = socket.id;
    console.log("Hello ", users);
  }

  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    try {
      let conversation = await Conversation.findOne({
        members: { $all: [senderId, receiverId] },
      });

      // Create message object
      const newMessage = new Message({
        senderId,
        receiverId,
        message: message,
      });

      // If no conversation exists, create a new one
      if (!conversation) {
        conversation = new Conversation({
          members: [senderId, receiverId],
          messages: [],
        });
      }

      // Save message first
      const savedMessage = await newMessage.save();

      // Push message to conversation and save
      conversation.messages.push(savedMessage._id);
      await conversation.save();
      socket.emit("messageSent", savedMessage);
      const receiverSocketId = users[receiverId];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", savedMessage);
      }

      console.log("message sent successfully!!");
    } catch (error) {
      console.error("Error sending message:", error);
      // res.status(500).json({ message: "Error sending message", error });
    }
  });

  io.emit("getonline", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getonline", Object.keys(users));
  });
});
export { app, io, server };
