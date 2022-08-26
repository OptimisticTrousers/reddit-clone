import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { RootState } from "../../redux/store";

interface AuthState {
  communityModalState: boolean;
  communityData: DocumentData;
  userCommunities: DocumentData[];
}

const initialState: AuthState = {
  communityModalState: false,
  communityData: {},
  userCommunities: [],
};

export const selectCommunityData = (state: RootState) =>
  state.subreddit.communityData;

export const selectCommunityModalState = (state: RootState) =>
  state.subreddit.communityModalState;

export const selectUserCommunitiesData = (state: RootState) =>
  state.subreddit.userCommunities;

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
    setUserCommunities: (state, action) => {
      state.userCommunities = action.payload;
    },
  },
});

export const {
  setCommunityData,
  toggleCommunityModalState,
  setUserCommunities,
} = subredditSlice.actions;

export default subredditSlice.reducer;
