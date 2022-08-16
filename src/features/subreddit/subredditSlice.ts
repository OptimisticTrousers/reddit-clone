import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface AuthState {
  subredditId: string;
  communityModalState: boolean;
  profileDropdownState: boolean;
}

const initialState: AuthState = {
  subredditId: "krnv57fgYupN9Kdvxit3",
  communityModalState: false,
  profileDropdownState: false,
};

export const selectSubredditId = (state: RootState) =>
  state.subreddit.subredditId;

export const selectCommunityModalState = (state: RootState) =>
  state.subreddit.communityModalState;

export const selectProfileDropdownState = (state: RootState) =>
  state.subreddit.profileDropdownState;

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
    toggleProfileDropdownState: (state) => {
      state.profileDropdownState = !state.profileDropdownState;
    },
  },
});

export const { getSubredditId, toggleCommunityModalState, toggleProfileDropdownState } =
  subredditSlice.actions;

export default subredditSlice.reducer;
