import mongoose from "mongoose";
import User from "./user.model.js";
const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxLength: 500,
      trim: true,
      validate: [
        {
          validator: function (value) {
            return value && value.length > 0;
          },
          message: "Message can't be empty",
        },
      ],
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", messageSchema);
export default Message;
