import { DocumentData } from "firebase/firestore";
import React from "react";
import CSSModules from "react-css-modules";
import styles from "./Comment.module.css";

const Comment: React.FC<DocumentData> = ({ comment }) => {
  return (
    <div styleName="comment">
      <div styleName="comment__author">{comment.content}</div>
    </div>
  );
};

export default CSSModules(Comment, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
