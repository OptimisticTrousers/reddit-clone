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
  const [postVote, setPostVote] = useState<number>(voteStatus);
  const [vote, setVote] = useState<number | undefined>(undefined);
  const voteRef = useRef<number | undefined>(undefined);

  const params = useParams();

  const isLoggedIn = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();

  const makeVote = useCallback(async () => {
    try {
      const batch = writeBatch(db);

      const userPostVotesRef = doc(
        db,
        "users",
        `${getUserId()}/postVotes/${postId}`
      );

      const postRef = doc(db, "posts", `${postId}`);
      const newVote = {
        id: userPostVotesRef.id,
        postId,
        subredditId,
        voteValue: vote!,
      };

      batch.set(userPostVotesRef, newVote);

      batch.update(postRef, { voteStatus: voteStatus + vote! });
      await batch.commit();
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  }, [postId, subredditId, vote, voteStatus]);

  function handleUpvote(event: Event) {
    event.preventDefault();
    if (!isLoggedIn) {
      dispatch(toggleSignInModal());
      return;
    }
    setVote((prevVote) => {
      if (prevVote === undefined) return;
      if (prevVote === 1) {
        return prevVote - 1;
      } else if (prevVote === -1) {
        return prevVote + 2;
      }
      return prevVote + 1;
    });
  }

  function handleDownvote(event: Event) {
    event.preventDefault();
    if (!isLoggedIn) {
      dispatch(toggleSignInModal());
      return;
    }
    setVote((prevVote) => {
      if (prevVote === undefined) return;
      if (prevVote === -1) {
        return prevVote + 1;
      } else if (prevVote === 1) {
        return prevVote - 2;
      }
      return prevVote - 1;
    });
  }

  useEffect(() => {
    async function fetchVote() {
      const userPostVotesRef = doc(
        db,
        "users",
        `${getUserId()}/postVotes/${postId}`
      );

      const userPostVotes = await getDoc(userPostVotesRef);

      setVote(userPostVotes.data()?.voteValue);
    }
    if (vote === undefined) {
      fetchVote();
    } else {
      makeVote();
    }
  }, [vote, makeVote, postId]);
  // async function fetchVotes(vote: number) {
  //   if (!isLoggedIn) dispatch(toggleSignInModal());

  //   const batch = writeBatch(db);
  //   try {
  //     const userPostVotesDocRef = doc(
  //       db,
  //       `users/${getUserId()}/postVotes/${postId}`
  //     );

  //     let voteChange = vote;

  //     if (!userVoteValue) {
  //       const newVote = {
  //         id: userPostVotesDocRef.id,
  //         postId,
  //         subredditId,
  //         voteValue: vote,
  //       };

  //       batch.set(userPostVotesDocRef, newVote);

  //       //updatedPost.voteStatus = voteStatus + post
  //       // setUserVote(vote);
  //       setPostVote(voteStatus + vote);
  //     } else {
  //       if (userVoteValue === vote) {
  //         //updatedPost.voteStatus = voteStatus - post
  //         batch.delete(userPostVotesDocRef);
  //         // setUserVote(-vote);
  //         setPostVote(voteStatus - vote);
  //         voteChange *= -1;
  //       } else {
  //         //updatedPost.voteStatus = voteStatus + 2 * vote;

  //         batch.update(userPostVotesDocRef, {
  //           voteValue: vote,
  //         });
  //         setPostVote(voteStatus + 2 * vote);
  //         // setUserVote(2 * vote);
  //       }
  //     }

  //     const postsRef = doc(db, "posts", postId);

  //     batch.update(postsRef, { voteStatus: voteStatus + voteChange });
  //     await batch.commit();
  //   } catch (error) {
  //     console.log(`ERROR: ${error}`);
  //   }
  // }

  // useEffect(() => {
  //   async function fetchInitialVotes() {

  //     const userPostVotesDocRef = doc(
  //       db,
  //       `users/${getUserId()}/postVotes/${postId}`
  //     );
  //     const userPostVotes = await getDoc(userPostVotesDocRef);

  //     if (userPostVotes.exists()) {
  //       setUserVote(userPostVotes.data().voteValue);
  //     }
  //   }

  //   fetchInitialVotes();
  // }, [postId]);

  // useEffect(() => {
  //   async function updateData() {
  //     try {
  //       await runTransaction(db, async (transaction) => {
  //         const postVotesDocRef = doc(
  //           db,
  //           "users",
  //           `${getUserId()}/postVotes/${postId}`
  //         );
  //         const postsVoteRef = doc(db, "posts", postId!);
  //         const newVote = {
  //           id: postVotesDocRef.id,
  //           postId: postId,
  //           subredditId,
  //           voteValue: vote,
  //         };

  //         transaction.set(postVotesDocRef, newVote);
  //         transaction.update(postsVoteRef, {
  //           voteStatus: voteStatus + vote,
  //         });
  //       });
  //     } catch (error) {
  //       console.log(`ERROR: ${error}`);
  //     }
  //   }

  //   if (isLoggedIn) {
  //     updateData();
  //   }
  // }, [vote, postId, subredditId, voteStatus, params.postId, isLoggedIn]);

  // useEffect(() => {
  //   async function getInitialVote() {
  //     try {
  //       const postVotesDocRef = doc(
  //         db,
  //         "users",
  //         `${getUserId()}/postVotes/${postId}`
  //       );

  //       const docData = await getDoc(postVotesDocRef);

  //       setVote(docData.data()!.voteValue);
  //     } catch (error) {
  //       console.log(`ERROR: ${error}`);
  //     }
  //   }

  //   if (isLoggedIn) {
  //     getInitialVote();
  //   }
  // }, [postId, isLoggedIn]);

  return (
    <div styleName="votes">
      <div styleName="votes__vote votes__vote_type_upvote">
        <img
          styleName={`votes__icon ${
            vote === 1 && "votes__icon--active-upvote"
          }`}
          src={upVote}
          alt="upvote icon"
          // onClick={() => fetchVotes(1)}
          onClick={handleUpvote}
        />
      </div>
      <p
        styleName={`votes__likes ${
          (vote === 1 && "votes__likes--upvote") ||
          (vote === -1 && "votes__likes--downvote")
        }`}
      >
        {voteStatus + (vote ?? 0)}
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
      </div>
    </div>
  );
};

export default CSSModules(Votes, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
