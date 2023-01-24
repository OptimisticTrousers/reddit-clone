import About from "../../../layouts/About/About";
import Comments from "../Comments/Comments";
import PostAuthor from "../PostAuthor/PostAuthor";
import PostInteractions from "../PostInteractions/PostInteractions";
import Votes from "../Votes/Votes";
import styles from "./SinglePost.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Location } from "react-router-dom";
import CommentsSection from "../CommentsSection/CommentsSection";
import CSSModules from "react-css-modules";
import Post from "../Post/Post";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  Query,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, getUserId } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setPostId } from "../../../features/post/postSlice";
import NestedList from "../../../components/Skeletons/AvatarWithText";
import Reddit from "../../../components/Skeletons/Reddit";
import UpworkJobLoader from "../../../components/Skeletons/UpworkJobLoader";
import Main from "../../../layouts/Main/Main";
import Aside from "../../../layouts/Aside/Aside";
import { selectCommunityData } from "../../../features/subreddit/subredditSlice";
import EmptyComments from "../EmptyComments/EmptyComments";

type LocationState = {
  length: number;
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
  const { postId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<DocumentData | undefined>();

  const [comments, setComments] = useState<DocumentData | undefined>(undefined);

  useEffect(() => {
    dispatch(setPostId(postId));

    const commentsRef = collection(db, "comments");
    const commentQuery = query(
      commentsRef,
      where("postId", "==", postId),
      where("parentId", "==", null)
    );

    onSnapshot(commentQuery, (snapshot) => {
      console.log(snapshot.docs);
      setComments(snapshot.docs);
    });
  }, [postId, dispatch]);

  useEffect(() => {
    async function fetchData() {
      if (!postId) return;

      const postRef = doc(db, "post", postId);

      onSnapshot(postRef, (doc) => {
        // console.log(doc.data());
        setData({ ...doc.data(), id: doc.id });
      });
    }
    fetchData();
  }, [postId]);

  const filterTop = async () => {
    try {
      const commentsRef = collection(db, "comments");

      const q = query(
        commentsRef,
        where("postId", "==", postId),
        orderBy("voteStatus", "desc")
      );

      const comments = await getDocs(q);

      setComments(comments.docs);
    } catch (error) {
      console.log(`Could not filter by top comments: ${error}`);
    }
  };

  const filterNew = async () => {
    try {
      const commentsRef = collection(db, "comments");

      const q = query(
        commentsRef,
        where("postId", "==", postId),
        orderBy("createdAt", "desc")
      );

      const comments = await getDocs(q);

      setComments(comments.docs);
    } catch (error) {
      console.log(`Could not filter by new comments: ${error}`);
    }
  };

  const filterRising = async () => {
    try {
      const commentsRef = collection(db, "comments");

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const q = query(
        commentsRef,
        where("postId", "==", postId),
        where("createdAt", ">=", yesterday)
      );

      const { docs } = await getDocs(q);

      const newComments = docs.sort(
        (a, b) => a.data().voteStatus - b.data().voteStatus
      );

      setComments(newComments);
    } catch (error) {
      console.log(`Could not filter by rising comments: ${error}`);
    }
  };

  return (
    <Main>
      <div styleName="post-page__container">
        <div styleName="post-page__post">
          {data?.length !== 0 ? (
            <Post
              data={data}

              // userVoteValue={postVotes?.docs.find((vote: DocumentData) => vote.postId === doc.id)?.voteValue}
            />
          ) : (
            <>
              <h2 styleName="post-page__text">
                hmm...this post doesn't seem to exist, redirecting...
              </h2>
              <UpworkJobLoader
                width={700}
                height={134}
                animate={true}
                backgroundColor={"#333"}
                foregroundColor={"#999"}
              />
              {setTimeout(() => {
                navigate("/");
              }, 1000)}
            </>
          )}
        </div>
        <div styleName="post-page__comments">
          <CommentsSection
            postId={postId}
            comments={comments}
            filterRising={filterRising}
            filterTop={filterTop}
            filterNew={filterNew}
          />
        </div>
      </div>
      <Aside>
        <About />
      </Aside>
    </Main>
  );
};

export default CSSModules(SinglePostPage, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
