import styles from "./Votes.module.css";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import React, { useEffect, useReducer, useState } from "react";
import CSSModules from "react-css-modules";
import {
  selectSignInModalState,
  toggleSignInModal,
} from "../../../features/auth/authSlice";
import {
  collection,
  doc,
  increment,
  runTransaction,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db, getUser, getUserId, isUserSignedIn } from "../../../firebase";
import { nanoid } from "nanoid";
import { batch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { selectPostId } from "../../../features/post/postSlice";
import upVote from "../../../assets/upvote.svg";
import downVote from "../../../assets/downvote.svg";

interface Props {
  voteStatus: number;
  subredditId: string;
}

const Votes: React.FC<Props> = ({ voteStatus, subredditId }) => {
  const [vote, setVote] = useState(0);

  const postId = useAppSelector(selectPostId);

  const dispatch = useAppDispatch();

  function handleUpvote() {
    if (isUserSignedIn() === false) {
      dispatch(toggleSignInModal());
    } else {
      setVote((prevVote) => {
        if (prevVote === 1) {
          return prevVote - 1;
        } else if (prevVote === -1) {
          return prevVote + 2;
        }
        return prevVote + 1;
      });
    }
  }

  function handleDownvote() {
    if (isUserSignedIn() === false) {
      dispatch(toggleSignInModal());
    } else {
      setVote((prevVote) => {
        if (prevVote === -1) {
          return prevVote + 1;
        } else if (prevVote === 1) {
          return prevVote - 2;
        }
        return prevVote - 1;
      });
    }
  }

  useEffect(() => {
    async function updateData() {
      try {
        // const batch = writeBatch(db);

        await runTransaction(db, async (transaction) => {
          const postVotesDocRef = doc(
            db,
            "users",
            `${getUserId()}/postVotes/${postId}`
          );
          const postsVoteRef = doc(db, "posts", postId);

          const postVotesDoc = await transaction.get(postVotesDocRef);

          // if (postVotesDoc.data()?.voteValue !== 0) {
          //   setVote(postVotesDoc.data()?.voteValue);
          //   return;
          // } else {
          const newVote = {
            id: postVotesDocRef.id,
            postId: postId,
            subredditId,
            voteValue: vote,
          };

          transaction.set(postVotesDocRef, newVote);
          transaction.update(postsVoteRef, {
            voteStatus: voteStatus + vote,
          });
        });

        // const postVoteRef = doc(
        //   db,
        //   "users",
        //   `${getUserId()}/postVotes/${postId}`
        // );

        // const postsVoteRef = doc(db, "posts", postId);

        // batch.set(postVoteRef, newVote);
        // batch.update(postsVoteRef, {
        //   voteStatus: voteStatus + vote,
        // });

        // await batch.commit();
      } catch (error) {
        console.log(`ERROR: ${error}`);
      }
    }

    // if (isUserSignedIn()) {
    //   updateData();
    // }
  }, [vote, postId, subredditId, voteStatus]);

  return (
    <div styleName="votes">
      <div styleName="votes__vote votes__vote_type_upvote">
        <img
          styleName={`votes__icon ${
            vote === 1 && "votes__icon--active-upvote"
          }`}
          src={upVote}
          alt="upvote icon"
          onClick={handleUpvote}
        />
        {/* <BiUpvote styleName="votes__icon votes__icon--active-upvote" onClick={handleUpvote} /> */}
      </div>
      <p
        styleName={`votes__likes ${
          (vote === 1 && "votes__likes--upvote") ||
          (vote === -1 && "votes__likes--downvote")
        }`}
      >
        {voteStatus + vote}
      </p>
      <div styleName="votes__vote">
        <img
          styleName={`votes__icon ${
            vote === -1 && "votes__icon--active-downvote"
          }`}
          src={downVote}
          alt="downvote icon"
          onClick={handleDownvote}
        />
        {/* <BiDownvote styleName="votes__icon" onClick={handleDownvote} /> */}
      </div>
    </div>
  );
};

export default CSSModules(Votes, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
