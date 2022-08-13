import { configureStore } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import authReducer from "../features/auth/authSlice";
import { setLoginStatus } from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export function authStateObserver(user: User | null) {
  if (user) {
    store.dispatch(setLoginStatus(true));
  } else {
    store.dispatch(setLoginStatus(false));
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
