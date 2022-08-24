import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import { db, getUserId, isUserSignedIn } from "../../firebase";
import Filter from "../../components/Filter/Filter";
import Comments from "../Subreddit/Comments/Comments";
import Posts from "../Subreddit/Posts/Posts";
import Header from "./Header/Header";
import styles from "./Profile.module.css";
import UserCard from "./UserCard/UserCard";
import { useFilter } from "../../hooks/hooks";
import Card from "../../components/Card/Card";

const Profile: React.FC = () => {
  const filter = useFilter();

  const [userPosts, setUserPosts] = useState<DocumentData | undefined>();

  const [userComments, setUserComments] = useState<DocumentData | undefined>();

  const [commentsPostId, setCommentsPostId] = useState<string | undefined>();

  const [upVotesPosts, setUpVotesPosts] = useState<DocumentData | undefined>();

  const [downVotesPosts, setDownVotesPosts] = useState<
    DocumentData | undefined
  >();

  useEffect(() => {
    const userPostsRef = collection(db, "posts");

    const q = query(
      userPostsRef,
      where("userId", "==", "fUKdoF2TCBcVFEzIaQaa2NJtcEn1")
    );

    getDocs(q).then((data: DocumentData) => {
      setUserPosts(data.docs);
    });
  }, []);

  useEffect(() => {
    const userCommentsRef = collection(db, "comments");

    const q = query(
      userCommentsRef,
      where("userId", "==", "fUKdoF2TCBcVFEzIaQaa2NJtcEn1")
    );

    getDocs(q).then((data: DocumentData) => {
      setCommentsPostId(data.docs[0].data().postId);
      setUserComments(data.docs);
    });
  }, []);

  useEffect(() => {
    async function fetchPostsFromUpVotes() {
      const upVotesRef = collection(db, "users", `${getUserId()}/postVotes`);

      const q = query(upVotesRef, where("voteStatus", "==", 1));

      const { docs } = await getDocs(q);

      const newDocs = docs.map(async (document: DocumentData) => {
        const postId = document.data().postId;

        const postRef = doc(db, "posts", postId);

        const data = await getDoc(postRef);

        return data;
      });

      const resolvedData = await Promise.all(newDocs);

      setUpVotesPosts(resolvedData);
    }

    fetchPostsFromUpVotes();
  }, []);

  useEffect(() => {
    async function fetchPostsFromDownVotes() {
      const downVotesRef = collection(db, "users", `${getUserId()}/postVotes`);

      const q = query(downVotesRef, where("voteStatus", "==", -1));

      const { docs } = await getDocs(q);

      const newDocs = docs.map(async (document: DocumentData) => {
        const postId = document.data().postId;

        const postRef = doc(db, "posts", postId);

        const data = await getDoc(postRef);

        return data;
      });

      const resolvedData = await Promise.all(newDocs);

      setUpVotesPosts(resolvedData);
    }

    fetchPostsFromDownVotes();
  }, []);

  return (
    <div>
      <Header />
      <main styleName="main">
        <div styleName="content">
          {/* <Filter {...filter} addPosts={addstuff} /> */}
          {/* <Posts posts={userPosts} /> */}
          {/* <Card>
            <Comments
              comments={userComments}
              postId={commentsPostId}
              renderCommentPost={true}
            />
          </Card> */}
          <Posts posts={upVotesPosts} />
          {/* <Posts posts={downVotesPosts} /> */}
        </div>
        <aside styleName="aside">
          <UserCard />
        </aside>
      </main>
    </div>
  );
};

export default CSSModules(Profile, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
