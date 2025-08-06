import Conversation from "../models/conversation.model.js";

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
export const recentChats = async (req, res) => {
  const userId = req.user._id;
  try {
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    })
      .populate({
        path: "members",
        select: "name",
      })
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 }, limit: 1 },
      })
      .sort({ updatedAt: -1 });
    //return the member name and the last message
    const formattedChats = conversation.map((chat) => ({
      member: chat.members.find(
        (member) => member._id.toString() !== userId.toString() //it return
        // the opposite user name not user name cause userId is our id
      ),
      lastMessage: chat.messages.length > 0 ? chat.messages[0].message : "",
    }));
    res.status(200).json(formattedChats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
