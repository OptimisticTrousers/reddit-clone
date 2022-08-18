import React from "react";
import CSSModules from "react-css-modules";
import styles from "./PostAuthor.module.css";

interface Props {
  subredditName: string;
  userId: string;
}

const PostAuthor: React.FC<Props> = ({ subredditName, userId }) => {
  return (
    <div styleName="post-excerpt__info">
      <span styleName="post-excerpt__posted-by">r/{subredditName}</span>
      <span styleName="post-excerpt__posted-by">Posted by</span>
      <p styleName="post-excerpt__author">/u/{userId}</p>
      <span styleName="post-excerpt__date">4 months ago</span>
    </div>
  );
};

export default CSSModules(PostAuthor, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
