import styles from "./index.module.css";
import About from "./About/About";
import Posts from "./Posts/Posts";
import Header from "./Header/Header";
import CSSModules from "react-css-modules";
import { useNavigate, useParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import {
  collection,
  doc,
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
import { useAppDispatch, useAppSelector, useFilter } from "../../hooks/hooks";
import {
  selectCommunityData,
  setCommunityData,
} from "../../features/subreddit/subredditSlice";
import Filter from "../../components/Filter/Filter";
import { List } from "react-content-loader";
import Reddit from "../../components/Skeletons/AuthorsList";
import AuthorsList from "../../components/Skeletons/AuthorsList";
import PostCreatorCard from "../../components/PostCreatorCard/PostCreatorCard";
import ProfileNotFound from "../Profile/ProfileNotFound/ProfileNotFound";

const Subreddit: React.FC = () => {
  const { subredditName } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, name } = useAppSelector(selectCommunityData);

  const { filterNew, filterRising, filterTop } = useFilter();

  // console.log(name);

  const [posts, setPosts] = useState<DocumentData | undefined>(undefined);

  async function filterPosts(promise: Promise<DocumentData>) {
    const data = await promise;
    setPosts(data);
  }

  useEffect(() => {
    async function communityExistance() {
      if (!id || !subredditName) return;

      const communityDocRef = doc(db, "subreddits", subredditName);

      const docData = await getDoc(communityDocRef);

      if (!docData.exists()) return;

      const postsRef = collection(db, "posts");

      const q = query(postsRef, where("subredditName", "==", subredditName));

      getDocs(q)
        .then((subredditPosts) => {
          setPosts(subredditPosts.docs);
        })
        .catch((error) => alert(`ERROR: ${error}`));
    }

    communityExistance();
  }, [id, subredditName]);

  return (
    <div styleName="subreddit">
      <Header subredditName={subredditName} />
      <main styleName="main">
        <div styleName="content">
          <PostCreatorCard />
          <Filter
            addPosts={filterPosts}
            filterNew={filterNew}
            filterTop={filterTop}
            filterRising={filterRising}
          />
          {posts?.length === 0 && <ProfileNotFound text="hmm...it seems that there are no posts"/>}
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
