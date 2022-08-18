import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { RootState } from "../../redux/store";

interface AuthState {
  communityModalState: boolean;
  communityData: DocumentData;
}

const initialState: AuthState = {
  communityModalState: false,
  communityData: {},
};

export const selectSubredditId = (state: RootState) =>
  state.subreddit.communityData;

export const selectCommunityModalState = (state: RootState) =>
  state.subreddit.communityModalState;

// export const selectCurrentSubredditData = (state: RootState) =>
//   state.subreddit.currentSubredditData;

const subredditSlice = createSlice({
  name: "subreddit",
  initialState,
  reducers: {
    setCommunityData: (state, action) => {
      state.communityData = action.payload;
    },
    toggleCommunityModalState: (state) => {
      state.communityModalState = !state.communityModalState;
    },
  },
});

export const { setCommunityData, toggleCommunityModalState } =
  subredditSlice.actions;

export default subredditSlice.reducer;
