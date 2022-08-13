import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { isUserSignedIn, signIn } from "../../firebase/index";
import { auth } from "../../firebase/index";

interface AuthState {
  value: boolean;
  status: string;
}

const initialState: AuthState = { value: false, status: "idle" };

export const logInThunk = createAsyncThunk("auth/userLogIn", async () => {
  await signIn();
  return isUserSignedIn();
});

export const logOutThunk = createAsyncThunk("auth/userLogOut", async () => {
  await signOut(auth);
  return isUserSignedIn();
});

export const selectUserState = (state: any) => console.log(state);

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(logInThunk.fulfilled, (state) => {
      state.status = "succeeded";
    });
  },
});

export default authSlice.reducer;
