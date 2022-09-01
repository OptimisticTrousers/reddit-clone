import CSSModules from "react-css-modules";
import { BiMessage } from "react-icons/bi";
import styles from "./PostInteractions.module.css";
import { IoMdShareAlt } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { selectAuthStatus, toggleSignInModal } from "../../../features/auth/authSlice";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { nanoid } from "nanoid";
import { db } from "../../../firebase";

interface Props {
  commentsQuantity: number;
  postId: string;
}

const PostInteractions: React.FC<Props> = ({ commentsQuantity, postId}) => {

  const isLoggedIn = useAppSelector(selectAuthStatus)
  const dispatch = useAppDispatch();
  async function savePosts() {
    if (!isLoggedIn) {
      dispatch(toggleSignInModal());
      return;
    }

    try {
      const docId = nanoid();

      const savedPostsRef = doc(db, "savedPosts", docId);

      await setDoc(savedPostsRef, {
        id: docId,
        postId,
        savedAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  }
  return (
    <div styleName="post-excerpt__interactions">
      <div styleName="post-excerpt__interaction">
        <BiMessage styleName="post-excerpt__icon" />
        <span styleName="post-excerpt__action">
          {commentsQuantity} Comments
        </span>
      </div>
      <div styleName="post-excerpt__interaction">
        <IoMdShareAlt styleName="post-excerpt__icon" />
        <span styleName="post-excerpt__action">Share</span>
      </div>
      <div styleName="post-excerpt__interaction">
        <FaRegBookmark styleName="post-excerpt__icon" />
        <span styleName="post-excerpt__action">Save</span>
      </div>
    </div>
  );
};

export default CSSModules(PostInteractions, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
