import styles from "./Subreddit.module.css";
import About from "../../layouts/About/About";
import Posts from "./Posts/Posts";
import Header from "./Header/Header";
import CSSModules from "react-css-modules";
import { useNavigate, useParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  useAppDispatch,
  useAppSelector,
  useFilter,
  useSubredditFilter,
} from "../../hooks/hooks";
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
import Main from "../../layouts/Main/Main";
import Aside from "../../layouts/Aside/Aside";

const Subreddit: React.FC = () => {
  const [posts, setPosts] = useState<DocumentData | undefined>(undefined);
  const { id } = useAppSelector(selectCommunityData);

  const { subredditName } = useParams();
  const { filterNew, filterRising, filterTop } =
    useSubredditFilter(subredditName);

  async function filterPosts(promise: Promise<DocumentData>) {
    const data = await promise;
    setPosts(data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function communityExistance() {
      if (!id || !subredditName) return;

      try {
        const communityDocRef = doc(db, "subreddits", subredditName);

        const docData = await getDoc(communityDocRef);

        if (!docData.exists()) return;

        const postsRef = collection(db, "posts");

        const q = query(postsRef, where("subredditName", "==", subredditName));

        const communityDocs = await getDocs(q);

        setPosts(communityDocs.docs);
      } catch (error) {
        console.log(`Could not check if the community exists: ${error}`);
      }
    }

    communityExistance();
  }, [id, subredditName]);

  return (
    <div styleName="subreddit">
      <Header subredditName={subredditName} />
      <Main>
        <div styleName="content">
          <PostCreatorCard />
          <Filter
            addPosts={filterPosts}
            filterNew={filterNew}
            filterTop={filterTop}
            filterRising={filterRising}
          />
          {posts?.length === 0 && (
            <ProfileNotFound text="hmm...it seems that there are no posts" />
          )}
          {posts ? (
            <Posts posts={posts} />
          ) : (
            <div styleName="profile-not-found">
              <h1 styleName="message">Subreddit Not Found...</h1>
              <AuthorsList
                animate={true}
                backgroundColor={"#333"}
                foregroundColor={"#999"}
                speed={1}
              />
            </div>
          )}
        </div>
        <Aside>
          <About />
        </Aside>
      </Main>
    </div>
  );
};

export default CSSModules(Subreddit, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
