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
  subredditId: string;
  postId: string;
}

type Event = React.MouseEvent<HTMLImageElement, MouseEvent>;

const Votes: React.FC<Props> = ({ voteStatus, subredditId, postId }) => {
  const [vote, setVote] = useState();
  const isLoggedIn = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();

  const onVote = async (vote: number) => {
    if (!isLoggedIn || !postId) {
      dispatch(toggleSignInModal());
      return;
    }

    try {
      await runTransaction(db, async (transaction) => {
        const userPostVotesRef = doc(
          db,
          "users",
          `${getUserId()}/postVotes/${getUserId()}/${postId}`
        );

        const postRef = doc(db, "posts", postId);

        const post = await transaction.get(postRef);

        const userPostVotes = await transaction.get(userPostVotesRef);
        let voteChange = vote;

        if (!userPostVotes.exists()) {
          const newVote = {
            id: userPostVotesRef.id,
            postId,
            subredditId,
            voteValue: vote,
          };

          transaction.set(userPostVotesRef, newVote);
        } else {
          if (userPostVotes.data().voteValue === vote) {
            voteChange *= -1;
            transaction.update(postRef, {
              voteStatus: post?.data()?.voteStatus - vote,
            });
            transaction.delete(userPostVotesRef);
          } else {
            voteChange = 2 * vote;
            transaction.update(postRef, {
              voteStatus: post?.data()?.voteStatus + 2 * vote,
            });
            transaction.update(userPostVotesRef, {
              voteValue: vote,
            });
          }
        }
        transaction.update(postRef, {
          voteStatus: post?.data()?.voteStatus + voteChange,
        });
      });
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };

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
          onClick={() => onVote(-1)}
        />
      </div>
    </div>
  );
};

export default CSSModules(Votes, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
