import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface AuthState {
  subredditId: string;
}

const initialState: AuthState = { subredditId: "krnv57fgYupN9Kdvxit3" };

export const selectSubredditId = (state: RootState) =>
  state.subreddit.subredditId;

const subredditSlice = createSlice({
  name: "subreddit",
  initialState,
  reducers: {
    getSubredditId: (state, action) => {
      state.subredditId = action.payload;
    },
  },
});

export const { getSubredditId } = subredditSlice.actions;

export default subredditSlice.reducer;
