import React from "react";
import s from "./Comment.module.css";

interface Comments {
  content: string;
  created_at: string;
  id: string;
  subreddit_id: string;
  updated_at: string;
  user_id: string;
}
const Comment: React.FC<Comments> = (comment) => {
  return (
    <div className={s["comment"]}>
      <div className={s["comment__author"]}>{comment.content}</div>
    </div>
  );
};

export default Comment;
