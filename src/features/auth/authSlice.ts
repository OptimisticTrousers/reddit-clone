import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isUserSignedIn } from "../../firebase";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = { isLoggedIn: false };

export const selectUserAuth = (state: AuthState) => state.isLoggedIn;

// export const checkUserStatus = createAsyncThunk("auth/checkAuth", () => {
//   return isUserSignedIn();
// });

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
