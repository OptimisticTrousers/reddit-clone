import styles from "./Post.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import Votes from "../Votes/Votes";
import PostAuthor from "../PostAuthor/PostAuthor";
import PostInteractions from "../PostInteractions/PostInteractions";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import CSSModules from "react-css-modules";
import { render } from "@testing-library/react";
import { db, getUserId } from "../../../firebase";
import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

interface Props {
  data: DocumentData;
  renderHover: boolean;
}

const Post: React.FC<Props> = (props) => {
  const { postId } = useParams();

  const [postData, setPostData] = useState<DocumentData | undefined>();

  // console.log(postId)

  useEffect(() => {
    async function fetchPost() {
      const postDocRef = doc(db, "posts", postId!);

      const postDoc = await getDoc(postDocRef);

      // console.log(postDoc.data())

      setPostData(postDoc.data());
    }

    props.data ?? fetchPost();
  }, []);
  return (
    <div
      styleName={props.renderHover ? "post-excerpt-hover" : "post-excerpt"}
      data-testid="post"
    >
      <Votes
        voteStatus={props.data?.voteStatus ?? postData?.voteStatus}
        subredditId={props.data?.subredditId ?? postData?.subredditId}
      />
      <div styleName="post-excerpt__content">
        <PostAuthor
          subredditName={props.data?.subredditName ?? postData?.subredditName}
          userName={props.data?.userName ?? postData?.userName}
          createdAt={props.data?.createdAt ?? postData?.createdAt}
        />
        <div styleName="post-excerpt__container">
          <h3 styleName="post-excerpt__title">{props.data?.title ?? postData?.title}</h3>
          <p styleName="post-excerpt__description">{props.data?.description ?? postData?.description}</p>
        </div>
        <div styleName="post__buttons">
          <div styleName="post-excerpt__divider"></div>
          <PostInteractions commentsQuantity={props.data?.commentsQuantity ?? postData?.commentsQuantity} />
        </div>
      </div>
    </div>
  );
};

export default CSSModules(Post, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
