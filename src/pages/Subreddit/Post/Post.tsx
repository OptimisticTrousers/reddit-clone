import styles from "./Post.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import Votes from "../Votes/Votes";
import PostAuthor from "../PostAuthor/PostAuthor";
import PostInteractions from "../PostInteractions/PostInteractions";
import { collection, doc, DocumentData, writeBatch } from "firebase/firestore";
import CSSModules from "react-css-modules";
import { render } from "@testing-library/react";
import { db, getUserId } from "../../../firebase";
import { useEffect, useReducer } from "react";

interface Props {
  data: DocumentData;
  renderHover: boolean;
}

const Post: React.FC<Props> = (props) => {

  return (
    <div
      styleName={props.renderHover ? "post-excerpt-hover" : "post-excerpt"}
      data-testid="post"
    >
      <Votes voteStatus={props.data?.voteStatus} subredditId={props.data?.subredditId} />
      <div styleName="post-excerpt__content">
        <PostAuthor subredditName={props.data?.subredditName} userName={props.data?.user_name} createdAt={props.data?.createdAt}/>
        <div styleName="post-excerpt__container">
          <h3 styleName="post-excerpt__title">{props.data?.title}</h3>
          <p styleName="post-excerpt__description">{props.data?.description}</p>
        </div>
        <div styleName="post__buttons">
          <div styleName="post-excerpt__divider"></div>
          <PostInteractions commentsQuantity={props.data?.commentsQuantity} />
        </div>
      </div>
    </div>
  );
};

export default CSSModules(Post, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
