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
  onReply: () => void;
}

const CommentInteractions: React.FC<Props> = ({ voteStatus, onReply }) => {
  return (
    <div styleName="interactions">
      <BiUpvote styleName="interactions__icon" />
      <p styleName="interactions__vote">{voteStatus}</p>
      <BiDownvote styleName="interactions__icon" />
      <div styleName="interactions__reply">
        <BiMessage styleName="interactions__icon" />
        <button styleName="interactions__button" onClick={onReply}>Reply</button>
      </div>
      <button styleName="interactions__button">Share</button>
      <button styleName="interactions__button">Report</button>
      <button styleName="interactions__button">Save</button>
      <button styleName="interactions__button">Follow</button>
      <button styleName="interactions__button" >
        Delete
      </button>
    </div>
  );
};

export default CSSModules(CommentInteractions, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
