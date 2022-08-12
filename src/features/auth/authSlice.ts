import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  value: boolean;
}

const initialState: AuthState = { value: false };

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    authenticate: (state) => {
      state.value = !state.value;
    },
  },
});

export const { authenticate } = authSlice.actions;

export default authSlice.reducer;
