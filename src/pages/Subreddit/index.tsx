import styles from "./index.module.css";
import About from "./About/About";
import Posts from "./Posts/Posts";
import Header from "./Header/Header";
import CSSModules from "react-css-modules";
import { useNavigate, useParams } from "react-router-dom";
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
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  selectCommunityData,
  setCommunityData,
} from "../../features/subreddit/subredditSlice";

const Subreddit: React.FC = () => {
  const { subredditName } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useAppSelector(selectCommunityData);

  const [posts, setPosts] = useState<DocumentData | undefined>(undefined);

  useEffect(() => {
    async function getSubredditData() {
      try {
        const subredditsRef = collection(db, "subreddits");

        const q = query(subredditsRef, where("name", "==", subredditName));

        const {
          docs: [communityData],
        } = await getDocs(q);

        dispatch(
          setCommunityData({
            ...communityData.data(),
            createdAt: communityData.data().createdAt.seconds,
          })
        );
      } catch (error) {
        alert(`ERROR: ${error}`);
      }
    }
    getSubredditData();
  }, [subredditName, dispatch]);

  useEffect(() => {
    if (id) {
      const postsRef = collection(db, "posts");

      const q = query(postsRef, where("subredditId", "==", id));

      getDocs(q).then((subredditPosts) => {
        setPosts(subredditPosts.docs);
      });
    }
  }, [id]);
  return (
    <div styleName="subreddit">
      <Header subredditName={subredditName} />
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
