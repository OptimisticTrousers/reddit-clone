import {
  collection,
  DocumentData,
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

  function addstuff() {}

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

  return (
    <div>
      <Header />
      <main styleName="main">
        <div styleName="content">
          <Filter {...filter} addPosts={addstuff} />
          {/* <Posts posts={userPosts} /> */}
          <Card>

            <Comments
              comments={userComments}
              postId={commentsPostId}
              renderCommentPost={true}
            />
          </Card>
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
