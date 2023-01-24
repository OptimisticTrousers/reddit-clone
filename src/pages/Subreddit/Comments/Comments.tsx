import styles from "./Comments.module.css";
import Comment from "../Comment/Comment";
import React, { Fragment, useEffect, useState } from "react";
import {
  collection,
  doc,
  DocumentChange,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, getUser, getUserId, getUserName } from "../../../firebase";
import CSSModules from "react-css-modules";
import EmptyComments from "../EmptyComments/EmptyComments";
import CommentInteractions from "../CommentInteractions/CommentInteractions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import {
  selectAuthStatus,
  toggleSignInModal,
} from "../../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

interface Props {
  comments: DocumentData | undefined;
  commentsPostId?: string;
}

const Comments: React.FC<Props> = ({ comments, commentsPostId }) => {
  const [postTitle, setPostTitle] = useState();
  const [subredditName, setSubredditName] = useState();
  const [postCreator, setPostCreator] = useState();
  const isLoggedIn = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { postId } = useParams();

  useEffect(() => {
    async function fetchPosts() {
      try {
        if (postId || commentsPostId) {
          const postsDocRef = doc(db, "posts", (postId || commentsPostId)!);

          const postsDoc = await getDoc(postsDocRef);

          const docData = postsDoc?.data();

          setPostTitle(docData?.title);
          setSubredditName(docData?.subredditName);
          setPostCreator(docData?.userName);
        }
      } catch (error) {
        console.log(`Could not fetch posts: ${error}`);
      }
    }
    fetchPosts();
  }, [postId, commentsPostId]);

  function navigateToPost() {
    navigate(`/r/${subredditName}/comments/${commentsPostId}`);
  }

  const onDeleteComment = async (id: string) => {
    try {
      if (postId) {
        const batch = writeBatch(db);

        const commentDocRef = doc(db, "comments", id);

        batch.update(commentDocRef, {
          userName: "[-]",
          content: "[deleted]",
          userId: "undefined",
        });

        const postDocRef = doc(db, "posts", postId);
        batch.update(postDocRef, {
          numberOfComments: increment(-1),
        });

        await batch.commit();
      }
    } catch (error) {
      alert(`Could not delete comment. Please try again: ${error}`);
    }
  };

  const onReply = async (id: string, content: string) => {
    if (!isLoggedIn) {
      dispatch(toggleSignInModal());
      return;
    }

    try {
      const parentRef = doc(db, "comments", id);

      const docId = nanoid();
      const newCommentRef = doc(db, "comments", docId);

      await setDoc(newCommentRef, {
        content,
        createdAt: serverTimestamp(),
        id: docId,
        subredditId: id,
        parentId: parentRef.id,
        postId: commentsPostId,
        updatedAt: serverTimestamp(),
        userName: getUserName(),
        userId: getUserId(),
        voteStatus: 0,
      });
    } catch (error) {
      alert(`Could not reply to comment. Please try again: ${error}`);
    }
  };

  const onVote = async (
    vote: number,
    commentId: string,
    postId: string | undefined
  ) => {
    if (!isLoggedIn) {
      dispatch(toggleSignInModal());
      return;
    }
    try {
      await runTransaction(db, async (transaction) => {
        const userCommentPostVotesRef = doc(
          db,
          "users",
          `${getUserId()}/commentVotes/${getUserId()}${commentId}`
        );

        const commentRef = doc(db, "comments", commentId);
        const comment = await transaction.get(commentRef);
        const userCommentPostVotes = await transaction.get(
          userCommentPostVotesRef
        );
        let voteChange = vote;

        if (!userCommentPostVotes.exists()) {
          const newVote = {
            id: nanoid(),
            postId,
            commentId,
            subredditName,
            voteValue: vote,
          };

          transaction.set(userCommentPostVotesRef, newVote);
        } else {
          if (userCommentPostVotes.data().voteValue === vote) {
            voteChange *= -1;
            transaction.update(commentRef, {
              voteStatus: comment?.data()?.voteStatus - vote,
            });
            transaction.delete(userCommentPostVotesRef);
          } else {
            voteChange = 2 * vote;
            transaction.update(commentRef, {
              voteStatus: comment?.data()?.voteStatus + 2 * vote,
            });
            transaction.update(userCommentPostVotesRef, {
              voteValue: vote,
            });
          }
        }

        transaction.update(commentRef, {
          voteStatus: comment?.data()?.voteStatus + voteChange,
        });
      });
    } catch (error) {
      alert(`Could not vote. Please try again!: ${error}`);
    }
  };

  const renderedComments = comments?.map((doc: DocumentData) => {
    let docData: DocumentData;
    if (doc?.data) {
      docData = doc?.data();
    } else {
      docData = doc?.doc?.data();
    }
    return (
      <React.Fragment key={doc?.id}>
        {location.pathname === "/user" && (
          <div styleName="comments__description" onClick={navigateToPost}>
            <p styleName="comments__user">{getUserName()}</p>
            <span styleName="comments__description">{`commented on '${postTitle}'`}</span>
            <p styleName="comments__text">{`r/${subredditName}`}</p>
            <span styleName="comments__description">{postCreator}</span>
          </div>
        )}
        <Comment comment={docData} postId={postId} id={docData.id}>
          <CommentInteractions
            voteStatus={docData?.voteStatus}
            onReply={(content: string) => onReply(docData?.id, content)}
            commentUserId={docData?.userId}
            onDelete={() => onDeleteComment(docData?.id)}
            onVote={(vote: number) => onVote(vote, docData.id, postId)}
            commentId={docData.id}
          />
        </Comment>
      </React.Fragment>
    );
  });
  return (
    <div styleName="comments">
      {renderedComments}
      {/* {renderedComments?.length === 0 ? <EmptyComments /> : renderedComments} */}
    </div>
  );
};

export default CSSModules(Comments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
