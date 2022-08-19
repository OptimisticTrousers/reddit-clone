import styles from "./CommentsSection.module.css";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  increment,
  Query,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { db, getUserId } from "../../../firebase";
import { useAppSelector } from "../../../hooks/hooks";
import Comments from "../Comments/Comments";
import { selectAuthStatus } from "../../../features/auth/authSlice";
import CSSModules from "react-css-modules";
import upsideDownTriangle from "../../../assets/upside-down-triangle.svg";
import { selectCommunityData } from "../../../features/subreddit/subredditSlice";

interface Props {
  postId: string | undefined;
  comments: DocumentData | undefined;
}

const CommentsSection: React.FC<Props> = ({ comments, postId }) => {
  const [commentText, setCommentText] = useState("");

  const { id } = useAppSelector(selectCommunityData);

  const isLoggedIn = useAppSelector(selectAuthStatus);

  const handleCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setCommentText(event.target.value);
  };

  const formSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (isLoggedIn) {
      const commentsRef = collection(db, "comments");
      await addDoc(commentsRef, {
        content: commentText,
        created_at: serverTimestamp(),
        id: nanoid(),
        subreddit_id: id,
        post_id: postId,
        updated_at: serverTimestamp(),
        user_id: getUserId(),
      });

      const postRef = doc(db, "posts", `${postId}`);

      await updateDoc(postRef, {
        commentsQuantity: increment(1),
      });

      setCommentText("");
    } else {
      alert("LOG IN SUCKER!!");
    }
  };
  return (
    <div styleName="comments-section">
      <div styleName="comments-section__user">
        <span styleName="comments-section__comment-as">
          Comment as{" "}
          <span styleName="comments-section__username">
            OptimisticTrousers1
          </span>
        </span>
      </div>
      <form onSubmit={formSubmit}>
        <div styleName="comments-section__comments-form">
          {/* <form onSubmit={formSubmit}> */}
          <textarea
            styleName="comments-section__comments-form-textarea"
            placeholder="What are your thoughts?"
            onChange={handleCommentChange}
            value={commentText}
            required
          ></textarea>
          <div styleName="comments-section__comments-form-button-container">
            <button
              type="submit"
              styleName="comments-section__comments-form-button"
            >
              Comment
            </button>
          </div>
          {/* </form> */}
        </div>
        <div styleName="comments-section__filter">
          <button styleName="comments-section__button">Sort By: Best</button>
          <img
            styleName="comments-section__icon"
            src={upsideDownTriangle}
            alt="tiny upside down triangle"
          />
        </div>
      </form>
      <hr />
      <div styleName="comments-section__discussion">
        <a styleName="comments-section__hyperlink">
          View discussions in 1 other community
        </a>
      </div>

      <Comments comments={comments} />
    </div>
  );
};

export default CSSModules(CommentsSection, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
