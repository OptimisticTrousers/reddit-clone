import styles from "./CommentsSection.module.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { db, getUserId } from "../../../firebase";
import { useAppSelector } from "../../../hooks/hooks";
import Comments from "../Comments/Comments";
import { selectSubredditId } from "../../../features/subreddit/subredditSlice";
import { selectAuthStatus } from "../../../features/auth/authSlice";
import CSSModules from "react-css-modules";

const CommentsSection = () => {
  const [commentText, setCommentText] = useState("");

  const subredditId = useAppSelector(selectSubredditId);

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
        subreddit_id: subredditId,
        updated_at: serverTimestamp(),
        user_id: getUserId(),
      });
    } else {
      alert("LOG IN SUCKER!!");
    }
  };
  return (
    <div>
      <form onSubmit={formSubmit}>
        <textarea
          placeholder="What are your thoughts"
          onChange={handleCommentChange}
          value={commentText}
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>
      <Comments />
    </div>
  );
};

export default CSSModules(CommentsSection, styles, { allowMultiple: true });
