import CSSModules from "react-css-modules";
import { BiMessage } from "react-icons/bi";
import styles from "./PostInteractions.module.css";
import { IoMdShareAlt } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  selectAuthStatus,
  toggleSignInModal,
} from "../../../features/auth/authSlice";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  addDoc,
  where,
  query,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { db, getUser, getUserId } from "../../../firebase";

interface Props {
  commentsQuantity: number;
  postId: string | undefined;
}

const PostInteractions: React.FC<Props> = ({ commentsQuantity, postId }) => {
  const isLoggedIn = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();

  const [saveButtonText, setSaveButtonText] = useState("Save");

  async function savePost() {
    if (!isLoggedIn) {
      dispatch(toggleSignInModal());
      return;
    }

    try {
      const docId = `${getUserId()}${postId}`;
      const savedPostsRef = doc(db, "savedPosts", docId);

      await setDoc(savedPostsRef, {
        id: docId,
        postId,
        savedAt: serverTimestamp(),
        userId: getUserId(),
      });
      setSaveButtonText("Saved");
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  }

  async function unSavePost() {
    if (!isLoggedIn) {
      dispatch(toggleSignInModal());
      return;
    }

    try {
      const savedPostDocRef = doc(db, "savedPosts", `${getUserId()}${postId}`);

      await deleteDoc(savedPostDocRef);

      setSaveButtonText("Save");
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  }

  useEffect(() => {
    async function fetchSaveStatus() {
      if (!isLoggedIn || !postId) {
        dispatch(toggleSignInModal());
        return;
      }

      try {
        const savedPostDocRef = doc(
          db,
          "savedPosts",
          `${getUserId()}${postId}`
        );

        const savedPostDoc = await getDoc(savedPostDocRef);

        if (savedPostDoc.exists()) {
          setSaveButtonText("Saved");
        }
      } catch (error) {
        console.log(`ERROR: ${error}`);
      }
    }
    fetchSaveStatus();
  }, [postId, dispatch, isLoggedIn]);
  return (
    <div
      styleName="post-excerpt__interactions"
      onClick={(e) => e.preventDefault()}
    >
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
        <span
          styleName="post-excerpt__action"
          onClick={saveButtonText === "Save" ? savePost : unSavePost}
        >
          {saveButtonText}
        </span>
      </div>
    </div>
  );
};

export default CSSModules(PostInteractions, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
