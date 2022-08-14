import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isUserSignedIn } from "../../firebase";
import { RootState } from "../../redux/store";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = { isLoggedIn: false };

export const selectAuthStatus = (state: RootState) => state.auth.isLoggedIn;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoginStatus } = authSlice.actions;

export default authSlice.reducer;
