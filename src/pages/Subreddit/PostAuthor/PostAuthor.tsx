import React from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import styles from "./PostAuthor.module.css";
import moment from "moment";

interface Props {
  subredditName: string;
  userName: string;
  createdAt: CreatedAt;
}

interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

const PostAuthor: React.FC<Props> = ({
  subredditName,
  userName,
  createdAt,
}) => {
  return (
    <div styleName="post-excerpt__info">
      <Link to={`/r/${subredditName}`}>
        <span styleName="post-excerpt__subreddit">r/{subredditName}</span>
      </Link>
      <span styleName="post-excerpt__posted-by">Posted by</span>
      <p styleName="post-excerpt__author">/u/{userName}</p>
      <span styleName="post-excerpt__date">
        {moment(new Date(createdAt?.seconds * 1000)).fromNow()}
      </span>
    </div>
  );
};

export default CSSModules(PostAuthor, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
