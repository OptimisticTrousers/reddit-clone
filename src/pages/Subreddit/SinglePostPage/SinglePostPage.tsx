import About from "../../../layouts/About/About";
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
import { useAppDispatch } from "../../../hooks/hooks";
import { setPostId } from "../../../features/post/postSlice";
import NestedList from "../../../components/Skeletons/AvatarWithText";
import Reddit from "../../../components/Skeletons/Reddit";
import UpworkJobLoader from "../../../components/Skeletons/UpworkJobLoader";

type LocationState = {
  title: string;
  description: string;
  createdAt: string;
  id: string;
  subredditId: string;
  updatedAt: string;
  userId: string;
  voteStatus: number;
  commentsQuantity: number;
};

const SinglePostPage = () => {
  const location = useLocation();
  const { postId } = useParams();

  const dispatch = useAppDispatch();

  const data = location.state as LocationState;

  const [comments, setComments] = useState<DocumentData | undefined>(undefined);

  useEffect(() => {
    dispatch(setPostId(postId));

    const commentsRef = collection(db, "comments");
    const commentQuery = query(commentsRef, where("postId", "==", postId));

    onSnapshot(commentQuery, async (snapshot) => {
      const docChanges = snapshot.docChanges();
      setComments(docChanges);
    });
  }, [postId, dispatch]);

  return (
    <section styleName="post-page">
      <div styleName="post-page__container">
        <div styleName="post-page__post">
          {comments ? (
            <Post data={data} renderHover={false} />
          ) : (
            <UpworkJobLoader
              width={700}
              height={134}
              animate={true}
              backgroundColor={"#333"}
              foregroundColor={"#999"}
            />
          )}
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
          <CommentsSection postId={postId} comments={comments} />
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
