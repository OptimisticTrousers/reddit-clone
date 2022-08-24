import styles from "./index.module.css";
import About from "./About/About";
import Posts from "./Posts/Posts";
import Header from "./Header/Header";
import CSSModules from "react-css-modules";
import { useNavigate, useParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
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
import Filter from "../../components/Filter/Filter";
import { List } from "react-content-loader";
import Reddit from "../../components/Skeletons/AuthorsList";
import AuthorsList from "../../components/Skeletons/AuthorsList";

const Subreddit: React.FC = () => {
  const { subredditName } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useAppSelector(selectCommunityData);

  const [posts, setPosts] = useState<DocumentData | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const postsRef = collection(db, "posts");

      const q = query(postsRef, where("subredditId", "==", id));

      getDocs(q).then((subredditPosts) => {
        setPosts(subredditPosts.docs);
      })
    }
  }, [id]);

  return (
    <div styleName="subreddit">
      <Header subredditName={subredditName} />
      <main styleName="main">
        <div styleName="content">
          <Filter />
          {posts ? (
            <Posts posts={posts} />
          ) : (
            <AuthorsList
              animate={true}
              backgroundColor={"#333"}
              foregroundColor={"#999"}
              speed={1}
            />
          )}
        </div>
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
