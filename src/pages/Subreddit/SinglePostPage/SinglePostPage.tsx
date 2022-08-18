import About from "../About/About";
import Comments from "../Comments/Comments";
import PostAuthor from "../PostAuthor/PostAuthor";
import PostInteractions from "../PostInteractions/PostInteractions";
import Votes from "../Votes/Votes";
import styles from "./SinglePost.module.css";
import { useLocation, useParams } from "react-router-dom";
import { Location } from "react-router-dom";
import CommentsSection from "../CommentsSection/CommentsSection";
import CSSModules from "react-css-modules";
import Post from "../Post/Post";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { useEffect, useState } from "react";
import {
  collection,
  DocumentData,
  DocumentReference,
  onSnapshot,
  Query,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";

type LocationState = {
  title: string;
  description: string;
  created_at: string;
  id: string;
  subreddit_id: string;
  updated_at: string;
  user_id: string;
  voteStatus: number;
  commentsQuantity: number;
};

const SinglePostPage = () => {
  const location = useLocation();
  const { postId } = useParams();

  const data = location.state as LocationState;

  const [comments, setComments] = useState<DocumentData | undefined>(undefined);

  useEffect(() => {
    const commentsRef = collection(db, "comments");
    const commentQuery = query(commentsRef, where("post_id", "==", postId));

    onSnapshot(commentQuery, async (snapshot) => {
      const docChanges = snapshot.docChanges();
      setComments(docChanges);
    });
  }, [postId]);
  return (
    <section styleName="post-page">
      <div styleName="post-page__container">
        <div styleName="post-page__post">
          <Post data={data} renderHover={false} />
        </div>
        {/* <Votes voteStatus={voteStatus} />
      <article styleName="post-page__content">
        <div styleName="post-page__post">
          <PostAuthor />
          <h2 styleName="post-page__title">{title}</h2>
          <p styleName="post-page__description">{description}</p>
          <PostInteractions />
        </div>
      </article> */}
        <div styleName="post-page__comments">
          <CommentsSection
            postId={postId}
            comments={comments}
          />
        </div>
      </div>
      <aside styleName="aside">
        <About />
      </aside>
    </section>
  );
};

export default CSSModules(SinglePostPage, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
