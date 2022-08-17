import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { RootState } from "../../redux/store";

interface AuthState {
  subredditId: string;
  communityModalState: boolean;
  subredditData: DocumentData;
}

const initialState: AuthState = {
  subredditId: "krnv57fgYupN9Kdvxit3",
  communityModalState: false,
  subredditData: {},
};

export const selectSubredditId = (state: RootState) =>
  state.subreddit.subredditId;

export const selectCommunityModalState = (state: RootState) =>
  state.subreddit.communityModalState;

export const selectSubredditData = (state: RootState) =>
  state.subreddit.subredditData;

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
    getSubredditData: (state, action) => {
      state.subredditData = action.payload;
    },
  },
});

export const { getSubredditId, toggleCommunityModalState, getSubredditData } =
  subredditSlice.actions;

export default subredditSlice.reducer;
