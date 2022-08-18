import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { RootState } from "../../redux/store";

interface AuthState {
  subredditId: string;
  communityModalState: boolean;
  // currentSubredditData: any;
}

const initialState: AuthState = {
  subredditId: "krnv57fgYupN9Kdvxit3",
  communityModalState: false,
  // currentSubredditData: {},
};

export const selectSubredditId = (state: RootState) =>
  state.subreddit.subredditId;

export const selectCommunityModalState = (state: RootState) =>
  state.subreddit.communityModalState;

// export const selectCurrentSubredditData = (state: RootState) =>
//   state.subreddit.currentSubredditData;

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
