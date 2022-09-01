import CSSModules from "react-css-modules";
import styles from "./CommentInteractions.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import React, { useState } from "react";
import {
  doc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db, getUserId, getUserName } from "../../../firebase";
import { isJsxClosingFragment } from "typescript";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  selectAuthStatus,
  toggleSignInModal,
} from "../../../features/auth/authSlice";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";

interface Props {
  voteStatus: number;
  id: string;
  postId: string | undefined;
}

const CommentInteractions: React.FC<Props> = ({ voteStatus, id, postId }) => {
  const isLoggedIn = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();
  const [childCommentText, setChildCommentText] = useState("");
  const onDeleteComment = async () => {
    try {
      if (postId) {
        const batch = writeBatch(db);

        const commentDocRef = doc(db, "comments", id);

        batch.delete(commentDocRef);

        const postDocRef = doc(db, "posts", postId);
        batch.update(postDocRef, {
          numberOfComments: increment(-1),
        });

        await batch.commit();
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };

  const onReply = async () => {
    if (!isLoggedIn) {
      dispatch(toggleSignInModal());
      return;
    }

    if (!postId) return;

    const parentRef = doc(db, "comments", postId);

    const docId = nanoid();
    const newCommentRef = doc(db, "comments", docId);

    await setDoc(newCommentRef, {
      content: childCommentText,
      createdAt: serverTimestamp(),
      id: docId,
      subredditId: id,
      parentId: parentRef.id,
      postId,
      updatedAt: serverTimestamp(),
      userName: getUserName(),
      userId: getUserId(),
      voteStatus: 0,
    });
  };
  return (
    <div styleName="interactions">
      <BiUpvote styleName="interactions__icon" />
      <p styleName="interactions__vote">{voteStatus}</p>
      <BiDownvote styleName="interactions__icon" />
      <div styleName="interactions__reply">
        <BiMessage styleName="interactions__icon" />
        <button styleName="interactions__button">Reply</button>
      </div>
      <button styleName="interactions__button">Share</button>
      <button styleName="interactions__button">Report</button>
      <button styleName="interactions__button">Save</button>
      <button styleName="interactions__button">Follow</button>
      <button styleName="interactions__button" onClick={onDeleteComment}>
        Delete
      </button>
    </div>
  );
};

export default CSSModules(CommentInteractions, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
