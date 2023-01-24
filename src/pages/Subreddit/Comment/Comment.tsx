import {
  collection,
  doc,
  DocumentData,
  getDocs,
  increment,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import moment from "moment";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import {
  selectAuthStatus,
  toggleSignInModal,
} from "../../../features/auth/authSlice";
import { db, getUserId, getUserName } from "../../../firebase";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import CommentInteractions from "../CommentInteractions/CommentInteractions";
import Comments from "../Comments/Comments";
import styles from "./Comment.module.css";

interface Props {
  comment: DocumentData;
  children: JSX.Element | JSX.Element[];
  postId: string | undefined;
  id: string;
}

const Comment: React.FC<Props> = ({ comment, children, postId, id }) => {
  const [childComments, setChildComments] = useState<
    DocumentData | undefined
  >();
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);

  useEffect(() => {
    async function fetchChildComments() {
      try {
        if (!id) return;
        const childCommentsRef = collection(db, "comments");

        const q = query(childCommentsRef, where("parentId", "==", id));

        onSnapshot(q, (snapshot) => {
          setChildComments(snapshot.docChanges());
        });
      } catch (error) {
        console.log(`Could not fetch child comments: ${error}`);
      }
    }

    fetchChildComments();
  }, [id]);

  return (
    <div styleName="comment">
      <div styleName="comment__user">
        <div styleName="comment__profile">
          <img
            styleName="comment__icon"
            src="https://styles.redditmedia.com/t5_g2km0/styles/profileIcon_snood9e1c00c-b1c6-46a9-a231-a6fcd78cdd16-headshot.png?width=256&height=256&crop=256:256,smart&s=bba24bf813728096bcea480988469df3e9e45c5d"
            alt="default profile icon"
          />
        </div>
        <button
          styleName="comment__treadline"
          aria-label="Hide Replies"
          onClick={() => setAreChildrenHidden(true)}
        />
      </div>
      <div styleName="comment__content">
        <div styleName="comment__body">
          <div styleName="comment__author">
            <p data-testid="author-description">
              {comment?.userName}{" "}
              <span styleName="comment__date">
                {moment(new Date(comment?.createdAt?.seconds * 1000)).fromNow()}
              </span>
            </p>
          </div>
          <div styleName="comment__message">{comment?.content}</div>
          {children}
          <div styleName={`${areChildrenHidden && "hide"}`}>
            <Comments comments={childComments} commentsPostId={postId} />
          </div>
          <button
            styleName={`comment__button ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(Comment, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
