import { DocumentData } from "firebase/firestore";
import moment from "moment";
import React from "react";
import CSSModules from "react-css-modules";
import { getUserName } from "../../../firebase";
import CommentInteractions from "../CommentInteractions/CommentInteractions";
import styles from "./Comment.module.css";

const Comment: React.FC<DocumentData> = ({ comment, postId, children }) => {
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

        <div styleName="comment__treadline"></div>
      </div>
      <div styleName="comment__content">
        <div styleName="comment__body">
          <div styleName="comment__author">
            <p>
              {comment?.userName === getUserName() && `${getUserName()}`}{" "}
          
              <span styleName="comment__date">{moment(new Date(comment?.createdAt?.seconds * 1000)).fromNow()}</span>
            </p>
          </div>
          <div styleName="comment__message">{comment?.content}</div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CSSModules(Comment, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
