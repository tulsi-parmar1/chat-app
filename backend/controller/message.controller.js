import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../SocketIO/server.js";
import { io } from "../SocketIO/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { messages } = req.body;
    const senderId = req.user._id; // Ensure req.user exists

    // Find existing conversation
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    // Create message object
    const newMessage = new Message({
      senderId,
      receiverId,
      message: messages,
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

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      message: "Message sent successfully",
      savedMessage,
      conversation,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message", error });
  }
};
export const getMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // Ensure req.user exists

    // Find existing conversation
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages"); //rerurn all the document (messages) of the conversation of members

    // If no conversation exists, return empty array
    if (!conversation) {
      return res.status(200).json({ messages: [] });
    }

    res.status(200).json({ messages: conversation.messages });
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ message: "Error getting messages", error });
  }
};
