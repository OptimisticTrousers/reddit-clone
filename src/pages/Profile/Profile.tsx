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
import { useFilter } from "../../hooks/hooks";
<<<<<<< Updated upstream
=======
import Filter from "../../components/Filter/Filter";
import { db, getUserId, isUserSignedIn } from "../../firebase";
import { useFilter } from "../../hooks/hooks";
import Comments from "../Subreddit/Comments/Comments";
import Posts from "../Subreddit/Posts/Posts";
import Header from "./Header/Header";
>>>>>>> Stashed changes
import styles from "./Profile.module.css";
import UserCard from "./UserCard/UserCard";

const Profile: React.FC = () => {
  const filter = useFilter();

  const [userPosts, setUserPosts] = useState<DocumentData | undefined>();

  const [userComments, setUserComments] = useState<DocumentData | undefined>();

  const [commentsPostId, setCommentsPostId] = useState<
    string | undefined
  >();

  function addstuff() {}

  useEffect(() => {
    const userPostsRef = collection(db, "posts");

    const q = query(userPostsRef, where("userId", "==", getUserId()));

    getDocs(q).then((data: DocumentData) => {
      setUserPosts(data.docs);
    });
  }, []);

  useEffect(() => {
    if(isUserSignedIn()) {

    const userCommentsRef = collection(db, "comments");

    const q = query(userCommentsRef, where("userId", "==", getUserId()));

    getDocs(q).then((data: DocumentData) => {

      console.log(data.docs[0].data().postId)
      setCommentsPostId(data.docs[0]?.data()?.postId)
      setUserComments(data.docs);
    });
    } 
  }, []);

  return (
    <div>
<<<<<<< Updated upstream
      <h1></h1>
=======
      <Header />
      <main styleName="main">
        <div styleName="content">
          <Filter {...filter} addPosts={addstuff} />
          {/* <Posts posts={userPosts} /> */}
          <Comments comments={userComments} postId={commentsPostId} />
        </div>
        <aside styleName="aside">
          <UserCard />
        </aside>
      </main>
>>>>>>> Stashed changes
    </div>
  );
};

export default CSSModules(Profile, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
