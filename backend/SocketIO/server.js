import { Server } from "socket.io";
import http from "http";
import express from "express";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-app-411a.vercel.app"],
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
  socket.on("followRequest", async (data) => {
    try {
      const id = data.id;

      const user = await User.findById(data.userId); //mari
      console.log(user, id);

      const userToFollow = await User.findById(id);

      if (!userToFollow) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.following.includes(userToFollow._id)) {
        return res.status(400).json({ message: "You are already following" });
      }
      if (!user.sentRequests) user.sentRequests = [];
      if (!userToFollow.followRequests) userToFollow.followRequests = [];

      userToFollow.followRequests.push(user._id);
      user.sentRequests.push(userToFollow._id); // Sender stores requested ID

      await user.save();
      await userToFollow.save();

      socket.emit("sendrequest", user);
      const userToFollowSocket = users[userToFollow._id];
      if (userToFollowSocket) {
        io.to(userToFollowSocket).emit("requestSendd", userToFollow);
      }
    } catch (error) {
      console.log(error);
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
