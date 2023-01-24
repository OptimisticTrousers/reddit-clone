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
  onSnapshot,
  query,
  runTransaction,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, getUser, getUserId } from "../../../firebase";
import { nanoid } from "nanoid";
import { batch, useDispatch } from "react-redux";
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
  onVote: (vote: number, event: Event) => void;
  postId: string | undefined;
}

type Event = React.MouseEvent<HTMLImageElement, MouseEvent>;

const Votes: React.FC<Props> = ({ voteStatus, onVote, postId }) => {
  const [vote, setVote] = useState(undefined);
  const isLoggedIn = useAppSelector(selectAuthStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchInitialVote() {
      if (!isLoggedIn) {
        return;
      }
      try {
        const userPostVoteRef = doc(
          db,
          "users",
          `${getUserId()}/postVotes/${postId}`
        );


        onSnapshot(userPostVoteRef, (doc) => {
          setVote(doc.data()?.voteValue);
        });
      } catch (error) {
        console.log(`Could not fetch initial vote: ${error}`);
      }
    }
    fetchInitialVote();
  }, [postId, dispatch, isLoggedIn]);

  return (
    <div styleName="votes">
      <div styleName="votes__vote votes__vote_type_upvote">
        <img
          styleName={`votes__icon ${
            vote === 1 && "votes__icon--active-upvote"
          }`}
          src={upVote}
          alt="upvote icon"
          onClick={(event: Event) => onVote(1, event)}
        />
      </div>
      <p styleName={`votes__likes }`}>{voteStatus}</p>
      <div styleName="votes__vote">
        <img
          styleName={`votes__icon ${
            vote === -1 && "votes__icon--active-downvote"
          }`}
          src={downVote}
          alt="downvote icon"
          onClick={(event: Event) => onVote(-1, event)}
        />
      </div>
    </div>
  );
};

export default CSSModules(Votes, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
