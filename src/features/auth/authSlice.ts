import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isUserSignedIn } from "../../firebase";
import { RootState } from "../../redux/store";

interface AuthState {
  isLoggedIn: boolean;
  signUpModalState: boolean;
}

const initialState: AuthState = { isLoggedIn: false, signUpModalState: false };

export const selectAuthStatus = (state: RootState) => state.auth.isLoggedIn;

export const selectSignUpModalState = (state: RootState) =>
  state.auth.signUpModalState;

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
  },
});

export const { setLoginStatus, toggleSignUpModal } = authSlice.actions;

export default authSlice.reducer;
