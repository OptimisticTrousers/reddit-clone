import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { RootState } from "../../redux/store";

interface Post {
  postId: string;
}

const initialState: Post = {
  postId: "",
};

export const selectPostId = (state: RootState) => state.post.postId;

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
  },
});

export const { setPostId } = postSlice.actions;

export default postSlice.reducer;
