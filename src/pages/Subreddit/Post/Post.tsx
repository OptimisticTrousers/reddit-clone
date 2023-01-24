import styles from "./Post.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import Votes from "../Votes/Votes";
import PostAuthor from "../PostAuthor/PostAuthor";
import PostInteractions from "../PostInteractions/PostInteractions";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import CSSModules from "react-css-modules";
import { render } from "@testing-library/react";
import { db, getUserId } from "../../../firebase";
import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  selectAuthStatus,
  toggleSignInModal,
} from "../../../features/auth/authSlice";
import { nanoid } from "nanoid";
import { useAppSelector } from "../../../hooks/hooks";
import { transcode } from "buffer";
import { selectCommunityData } from "../../../features/subreddit/subredditSlice";

interface Props {
  data: DocumentData | undefined;
}

const Post: React.FC<Props> = (props) => {
  const { postId } = useParams();

  const [postData, setPostData] = useState<DocumentData | undefined>();
  const [userPostVote, setUserPostVote] = useState<DocumentData | undefined>();

  const isLoggedIn = useAppSelector(selectAuthStatus);
  const dispatch = useDispatch();
  const location = useLocation();
  const { id: subredditId } = useAppSelector(selectCommunityData);

  useEffect(() => {
    async function fetchPost() {
      const postDocRef = collection(db, "posts");

      const q = query(postDocRef, where("id", "==", postId));

      const postDoc = await getDocs(q);

      // setPostData(postDoc?.docs[0]?.data());
      onSnapshot(q, (snapshot: QuerySnapshot) => {
        console.log(snapshot.docs);
        setPostData({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
      });
    }

    props.data ?? fetchPost();
  }, [postId, props.data]);

  const onVote = async (
    vote: number,
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!isLoggedIn) {
      dispatch(toggleSignInModal());
      return;
    }

    try {
      await runTransaction(db, async (transaction) => {
        const userPostVotesRef = doc(
          db,
          "users",
          `${getUserId()}/postVotes/${postId ?? props.data?.id}`
        );

        const postRef = doc(db, "posts", postId ?? props.data?.id);

        const post = await transaction.get(postRef);

        const userPostVotes = await transaction.get(userPostVotesRef);
        let voteChange = vote;

        if (!userPostVotes.exists()) {
          const newVote = {
            id: userPostVotesRef.id,
            postId: postId ?? props.data?.id,
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
      alert(`Could not vote on post. Please try again: ${error}`);
    }
  };

  return (
    <div
      styleName={postId ? "post-excerpt" : "post-excerpt-hover"}
      data-testid="post"
    >
      <Votes
        voteStatus={props.data?.voteStatus ?? postData?.voteStatus}
        onVote={(
          vote: number,
          event: React.MouseEvent<HTMLImageElement, MouseEvent>
        ) => onVote(vote, event)}
        postId={postId ?? props.data?.id}
      />
      <div styleName="post-excerpt__content">
        <PostAuthor
          subredditName={props.data?.subredditName ?? postData?.subredditName}
          userName={props.data?.userName ?? postData?.userName}
          createdAt={props.data?.createdAt ?? postData?.createdAt}
        />
        <div styleName="post-excerpt__container">
          <h3 styleName="post-excerpt__title">
            {props.data?.title ?? postData?.title}
          </h3>
          <p
            styleName={`post-excerpt__description ${
              !postId && "post-excerpt__overflow"
            }`}
          >
            {props.data?.description ?? postData?.description}
          </p>
          <p styleName="post-excerpt__description">
            {props.data?.link ?? postData?.link}
          </p>
          {props.data?.imageURL ||
            (postData?.imageURL && (
              <div styleName="post-excerpt__image-container">
                <img
                  styleName="post-excerpt__image"
                  src={postData?.imageURL ?? props.data?.imageURL}
                  alt="post"
                />
              </div>
            ))}
        </div>
        <div styleName="post__buttons">
          <div styleName="post-excerpt__divider"></div>
          <PostInteractions
            commentsQuantity={
              props.data?.commentsQuantity ?? postData?.commentsQuantity
            }
            postId={postId}
          />
        </div>
      </div>
    </div>
  );
};

export default CSSModules(Post, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
