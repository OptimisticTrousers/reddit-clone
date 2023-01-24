import CSSModules from "react-css-modules";
import styles from "./CommentInteractions.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  increment,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db, getUser, getUserId, getUserName } from "../../../firebase";
import { isJsxClosingFragment } from "typescript";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  selectAuthStatus,
  toggleSignInModal,
} from "../../../features/auth/authSlice";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import CommentForm from "../CommentForm/CommentForm";

interface Props {
  voteStatus: number;
  onReply: (content: string) => void;
  commentUserId: string;
  onDelete: () => void;
  onVote: (vote: number) => void;
  commentId: string;
}

const CommentInteractions: React.FC<Props> = ({
  voteStatus,
  onReply,
  commentUserId,
  onDelete,
  onVote,
  commentId,
}) => {
  const [isReplying, setIsReplying] = useState(false);

  const [vote, setVote] = useState();

  useEffect(() => {
    async function fetchInitialVote() {
      try {
        const userCommentVoteRef = doc(
          db,
          "users",
          `${getUserId()}/commentVotes/${getUserId()}${commentId}`
        );

        onSnapshot(userCommentVoteRef, (snapshot) => {
          setVote(snapshot?.data()?.voteValue);
        });
      } catch (error) {
        console.log(`Could not fetch initial vote: ${error}`);
      }
    }
    fetchInitialVote();
  }, [commentId]);

  return (
    <div>
      <div styleName="interactions">
        <BiUpvote
          styleName={`interactions__icon ${
            vote === 1 && "interactions__icon--upvote"
          }`}
          onClick={() => onVote(1)}
        />
        <p styleName="interactions__vote">{voteStatus}</p>
        <BiDownvote
          styleName={`interactions__icon ${
            vote === -1 && "interactions__icon--downvote"
          }`}
          onClick={() => onVote(-1)}
        />
        <div
          styleName="interactions__reply"
          onClick={() => setIsReplying((prevValue) => !prevValue)}
        >
          <BiMessage styleName="interactions__icon" />
          <button styleName="interactions__button">Reply</button>
        </div>
        {/* <button styleName="interactions__button">Share</button>
      <button styleName="interactions__button">Report</button>
      <button styleName="interactions__button">Save</button>
      <button styleName="interactions__button">Follow</button> */}
        {commentUserId === getUserId() && (
          <button styleName="interactions__button" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
      {isReplying && (
        <div>
          <CommentForm
            autoFocus={true}
            onReply={onReply}
            setIsReplying={setIsReplying}
          />
        </div>
      )}
    </div>
  );
};

export default CSSModules(CommentInteractions, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
