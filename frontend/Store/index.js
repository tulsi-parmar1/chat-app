import { configureStore } from "@reduxjs/toolkit";
import conversationSlice from "../Slice/ConversationSlice";

const store = configureStore({
  reducer: {
    conversation: conversationSlice.reducer,
  },
});
export default store;
