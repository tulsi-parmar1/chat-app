import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    user: null,
    messages: [],
    selectedConversation: null,
  },
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload); // Append new message
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const conversationActions = conversationSlice.actions;
export default conversationSlice;
