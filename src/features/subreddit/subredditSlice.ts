import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface AuthState {
  subredditId: string;
  communityModalState: boolean;
}

const initialState: AuthState = {
  subredditId: "krnv57fgYupN9Kdvxit3",
  communityModalState: false,
};

export const selectSubredditId = (state: RootState) =>
  state.subreddit.subredditId;

const subredditSlice = createSlice({
  name: "subreddit",
  initialState,
  reducers: {
    getSubredditId: (state, action) => {
      state.subredditId = action.payload;
    },
    setCommunityModalState: (state, action) => {
      state.communityModalState = action.payload;
    },
  },
});

export const { getSubredditId, setCommunityModalState } =
  subredditSlice.actions;

export default subredditSlice.reducer;
