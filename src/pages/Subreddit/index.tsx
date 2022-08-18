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
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAppDispatch } from "../../hooks/hooks";

const Subreddit: React.FC = () => {
  const { subredditName } = useParams();
  const dispatch = useAppDispatch();
  console.log(subredditName);


  const [posts, setPosts] = useState<any>(undefined);

  useEffect(() => {
    const subredditsRef = collection(db, "posts");

    const q = query(
      subredditsRef,
      where("subreddit_id", "==", "krnv57fgYupN9Kdvxit3")
    );

    getDocs(q).then((subredditPosts) => setPosts(subredditPosts.docs));


  }, []);
  return (
    <div styleName="subreddit">
      <Header />
      <main styleName="main">
        <Posts posts={posts}/>
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
