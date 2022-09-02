import CSSModules from "react-css-modules";
import styles from "./CommentInteractions.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import {
  doc,
  increment,
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
}

const CommentInteractions: React.FC<Props> = ({
  voteStatus,
  onReply,
  commentUserId,
  onDelete,
  onVote,
}) => {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div>
      <div styleName="interactions">
        <BiUpvote styleName="interactions__icon" />
        <p styleName="interactions__vote">{voteStatus}</p>
        <BiDownvote styleName="interactions__icon" />
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
          <CommentForm autoFocus={true} onReply={onReply} />
        </div>
      )}
    </div>
  );
};

export default CSSModules(CommentInteractions, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
