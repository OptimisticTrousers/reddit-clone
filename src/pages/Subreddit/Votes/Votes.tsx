import styles from "./Votes.module.css";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import CSSModules from "react-css-modules";
import {
  selectAuthStatus,
  selectSignInModalState,
  toggleSignInModal,
} from "../../../features/auth/authSlice";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  query,
  runTransaction,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, getUser, getUserId } from "../../../firebase";
import { nanoid } from "nanoid";
import { batch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { selectPostId } from "../../../features/post/postSlice";
import upVote from "../../../assets/upvote.svg";
import downVote from "../../../assets/downvote.svg";
import { Collection } from "typescript";
import { useParams } from "react-router-dom";
import { getInitialValue } from "@testing-library/user-event/dist/types/document/UI";
import { toggleCommunityModalState } from "../../../features/subreddit/subredditSlice";

interface Props {
  voteStatus: number;
  onVote: (vote: number) => void;
  postId: string;
}

type Event = React.MouseEvent<HTMLImageElement, MouseEvent>;

const Votes: React.FC<Props> = ({ voteStatus, onVote, postId }) => {
  const [vote, setVote] = useState();

  useEffect(() => {
    async function fetchInitialVote() {
      try {
        const userPostVoteRef = doc(
          db,
          "users",
          `${getUserId()}/postVotes/${postId}`
        );

        const userPostVote = await getDoc(userPostVoteRef);

        setVote(userPostVote.data()?.voteValue);
      } catch (error) {
        console.log(`ERROR: ${error}`);
      }
    }
    fetchInitialVote();
  }, [postId]);

  return (
    <div styleName="votes">
      <div styleName="votes__vote votes__vote_type_upvote">
        <img
          styleName={`votes__icon ${
            vote === 1 && "votes__icon--active-upvote"
          }`}
          src={upVote}
          alt="upvote icon"
          onClick={() => onVote(1)}
        />
      </div>
      <p
        styleName={`votes__likes ${
          (vote === 1 && "votes__likes--upvote") ||
          (vote === -1 && "votes__likes--downvote")
        }`}
      >
        {voteStatus}
      </p>
      <div styleName="votes__vote">
        <img
          styleName={`votes__icon ${
            vote === -1 && "votes__icon--active-downvote"
          }`}
          src={downVote}
          alt="downvote icon"
          onClick={() => onVote(1)}
        />
      </div>
    </div>
  );
};

export default CSSModules(Votes, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
