import { DocumentData } from "firebase/firestore";
import React from "react";
import s from "./Comment.module.css";

const Comment: React.FC<DocumentData> = ({ comment }) => {
  return (
    <div className={s["comment"]}>
      <div className={s["comment__author"]}>{comment.content}</div>
    </div>
  );
};

export default Comment;
