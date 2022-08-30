/* eslint-disable no-restricted-globals */
import { configureStore } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import authReducer from "../features/auth/authSlice";
import subredditReducer from "../features/subreddit/subredditSlice";
import postReducer from "../features/post/postSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subreddit: subredditReducer,
    post: postReducer,
  },
});

export function authStateObserver(user: User | null) {}



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
