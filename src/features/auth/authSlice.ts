import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface AuthState {
  signUpModalState: boolean;
  signInModalState: boolean;
}

const initialState: AuthState = {
  signUpModalState: false,
  signInModalState: false,
};

export const selectSignUpModalState = (state: RootState) =>
  state.auth.signUpModalState;

export const selectSignInModalState = (state: RootState) =>
  state.auth.signInModalState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleSignUpModal: (state) => {
      state.signUpModalState = !state.signUpModalState;
    },
    toggleSignInModal: (state) => {
      state.signInModalState = !state.signInModalState;
    },
  },
});

export const { toggleSignUpModal, toggleSignInModal } = authSlice.actions;

export default authSlice.reducer;
