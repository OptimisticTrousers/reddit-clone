import styles from "./Comments.module.css";
import Comment from "../Comment/Comment";
import React, { useEffect, useState } from "react";
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
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, getUser, getUserId, getUserName } from "../../../firebase";
import CSSModules from "react-css-modules";
import EmptyComments from "../EmptyComments/EmptyComments";
import CommentInteractions from "../CommentInteractions/CommentInteractions";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { selectAuthStatus, toggleSignInModal } from "../../../features/auth/authSlice";
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
        console.log(`ERROR: ${error}`);
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

        batch.delete(commentDocRef);

        const postDocRef = doc(db, "posts", postId);
        batch.update(postDocRef, {
          numberOfComments: increment(-1),
        });

        await batch.commit();
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };

  const onReply = async (id: string, postId: string | undefined) => {
    if (!isLoggedIn) {
      dispatch(toggleSignInModal());
      return;
    }

    if (!postId) return;

    const parentRef = doc(db, "comments", id);

    const docId = nanoid();
    const newCommentRef = doc(db, "comments", docId);

    await setDoc(newCommentRef, {
      content: "HEY THIS IS A CHILD COMMENT",
      createdAt: serverTimestamp(),
      id: docId,
      subredditId: id,
      parentId: parentRef.id,
      postId,
      updatedAt: serverTimestamp(),
      userName: getUserName(),
      userId: getUserId(),
      voteStatus: 0,
    });
  };

  const renderedComments = comments?.map((doc: DocumentData) => {
    let docData;
    if (doc?.data) {
      docData = doc?.data();
    } else {
      docData = doc?.doc?.data();
    }
    return (
      <>
        {commentsPostId && (
          <div styleName="comments__description" onClick={navigateToPost}>
            <p styleName="comments__user">{getUserName()}</p>
            <span styleName="comments__description">{`commented on '${postTitle}'`}</span>
            <p styleName="comments__text">{`r/${subredditName}`}</p>
            <span styleName="comments__description">{postCreator}</span>
          </div>
        )}
        <Comment key={doc?.id} comment={docData} postId={postId} id={doc.id}>
          <CommentInteractions
            voteStatus={docData?.voteStatus}
            onReply={() => onReply(doc.id, postId)}
          />
        </Comment>
      </>
    );
  });
  return (
    <div styleName="comments">
      {renderedComments?.length === 0 ? <EmptyComments /> : renderedComments}
    </div>
  );
};

export default CSSModules(Comments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
