import { createSlice } from "@reduxjs/toolkit";

interface authState {
  value: boolean;
}

const initialState = { value: false } as authState;

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {},
});
