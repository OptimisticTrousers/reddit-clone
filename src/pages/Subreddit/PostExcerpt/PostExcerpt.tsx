import styles from "./PostExcerpt.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import Votes from "../Votes/Votes";
import PostAuthor from "../PostAuthor/PostAuthor";
import PostInteractions from "../PostInteractions/PostInteractions";
import { DocumentData } from "firebase/firestore";
import CSSModules from "react-css-modules";

const PostExcerpt: React.FC<DocumentData> = ({ data }) => {
  const { voteStatus, title, description } = data;
  return (
    <div styleName="post-excerpt">
      <Votes voteStatus={voteStatus} />
      <div styleName="post-excerpt__content">
        {/* <span>Image goes here</span> */}
        <PostAuthor />
        <div styleName="post-excerpt__container">
          <h3 styleName="post-excerpt__title">{title}</h3>
          <p styleName="post-excerpt__description">{description}</p>
        </div>
        {/* {conditional rendering for sticky post} */}
        <div styleName="post__buttons">
          {/* <span>Expand</span> */}
          <div styleName="post-excerpt__divider"></div>
          <PostInteractions />
        </div>
      </div>
    </div>
  );
};

export default CSSModules(PostExcerpt, styles, { allowMultiple: true });
