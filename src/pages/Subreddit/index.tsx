import styles from "./index.module.css";
import About from "./About/About";
import Posts from "./Posts/Posts";
import Header from "./Header/Header";
import CSSModules from "react-css-modules";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAppDispatch } from "../../hooks/hooks";
import { setCommunityData } from "../../features/subreddit/subredditSlice";

const Subreddit: React.FC = () => {
  const { subredditName } = useParams();
  const dispatch = useAppDispatch();

  const [posts, setPosts] = useState<DocumentData | undefined>(undefined);

  useEffect(() => {
    const subredditsRef = collection(db, "subreddits");

    const q = query(subredditsRef, where("name", "==", subredditName));

    getDocs(q).then((subredditPosts) => {
      const communityData = subredditPosts.docs[0].data();
      dispatch(
        setCommunityData({
          ...communityData,
          created_at: communityData.created_at.seconds,
        })
      );
    });
  }, [subredditName, dispatch]);

  useEffect(() => {
    const postsRef = collection(db, "posts");

    const q = query(
      postsRef,
      where("subreddit_id", "==", "krnv57fgYupN9Kdvxit3")
    );

    getDocs(q).then((subredditPosts) => setPosts(subredditPosts.docs));
  }, []);
  return (
    <div styleName="subreddit">
      <Header />
      <main styleName="main">
        <Posts posts={posts} />
        <aside styleName="aside">
          <About />
        </aside>
      </main>
    </div>
  );
};

export default CSSModules(Subreddit, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
