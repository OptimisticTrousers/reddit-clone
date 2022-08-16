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

export const selectCommunityModalState = (state: RootState) =>
  state.subreddit.communityModalState;

const subredditSlice = createSlice({
  name: "subreddit",
  initialState,
  reducers: {
    getSubredditId: (state, action) => {
      state.subredditId = action.payload;
    },
    toggleCommunityModalState: (state) => {
      state.communityModalState = !state.communityModalState;
    },
  },
});

export const { getSubredditId, toggleCommunityModalState } =
  subredditSlice.actions;

export default subredditSlice.reducer;
