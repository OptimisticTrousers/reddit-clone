import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { RootState } from "../../redux/store";

interface AuthState {
  subredditId: string;
  communityModalState: boolean;
  status: string
  currentSubredditData: any;
}

const initialState: AuthState = {
  subredditId: "krnv57fgYupN9Kdvxit3",
  communityModalState: false,
  status: "idle",
  subredditData: {},
};
export const fetchSubredditPosts = createAsyncThunk(
  "posts/fetchSubredditPosts",
  async () => {
    const subredditPostsRef = collection(db, "posts");

    const q = query(
      subredditPostsRef,
      where("subreddit_id", "==", selectSubredditId)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot;
  }
);

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
    setSubredditData: (state, action) => {
      state.subredditData = {
        ...action.payload,
        created_at: action.payload.created_at.seconds,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSubredditPosts.pending, (state, action) => {
      state.status = "loading"
    }).addCase(fetchSubredditPosts.fulfilled, (state, action) => {
      state.status = "succeeded"

      state.communtiyData
    })
  }
});

export const { getSubredditId, toggleCommunityModalState, setSubredditData } =
  subredditSlice.actions;

export default subredditSlice.reducer;
