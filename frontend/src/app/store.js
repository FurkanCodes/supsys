import { configureStore } from "@reduxjs/toolkit";
import authRed from "../features/auth/authSlice";
import ticketRed from "../features/tickets/ticketSlice";
import commentRed from "../features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    auth: authRed,
    tickets: ticketRed,
    comments: commentRed,
  },
  devTools: true,
});
