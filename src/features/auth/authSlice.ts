import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface AuthState {
  isLoggedIn: boolean;
  signUpModalState: boolean;
  signInModalState: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  signUpModalState: false,
  signInModalState: false,
};

export const selectAuthStatus = (state: RootState) => state.auth.isLoggedIn;

export const selectSignUpModalState = (state: RootState) =>
  state.auth.signUpModalState;

export const selectSignInModalState = (state: RootState) =>
  state.auth.signInModalState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    toggleSignUpModal: (state) => {
      state.signUpModalState = !state.signUpModalState;
    },
    toggleSignInModal: (state) => {
      state.signInModalState = !state.signInModalState;
    },
  },
});

export const { setLoginStatus, toggleSignUpModal, toggleSignInModal } =
  authSlice.actions;

export default authSlice.reducer;