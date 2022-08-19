import React from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import styles from "./PostAuthor.module.css";

interface Props {
  subredditName: string;
  userName: string;
}

const PostAuthor: React.FC<Props> = ({ subredditName, userName }) => {
  return (
    <div styleName="post-excerpt__info">
      <Link to={`/r/${subredditName}`}>
        <span styleName="post-excerpt__subreddit">r/{subredditName}</span>
      </Link>
      <span styleName="post-excerpt__posted-by">Posted by</span>
      <p styleName="post-excerpt__author">/u/{userName}</p>
      <span styleName="post-excerpt__date">4 months ago</span>
    </div>
  );
};

export default CSSModules(PostAuthor, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
