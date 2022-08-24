import CSSModules from "react-css-modules";
import Posts from "../Subreddit/Posts/Posts";
import styles from "./Home.module.css";
import PremiumCard from "./PremiumCard/PremiumCard";
import TopCommunitiesCard from "./TopCommunitiesCard/TopCommunitiesCard";
import PostCreatorCard from "../../components/PostCreatorCard/PostCreatorCard";
import Filter from "../../components/Filter/Filter";
import PersonalHomeCard from "./PersonalHomeCard/PersonalHomeCard";
import { useState } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const Home: React.FC = () => {
  const [filteredPosts, setFilteredPosts] = useState();

  async function filterNew() {
    const postsDocsRef = collection(db, "posts");

    const q = query(postsDocsRef, orderBy("createdAt", "desc"));

    getDocs(q)
      .then((data: DocumentData) => {
        setFilteredPosts(data.docs);
      })
      .catch((error) => alert(`ERROR: ${error}`));
  }

  async function filterTop() {
    const postsDocsRef = collection(db, "posts");

    const q = query(postsDocsRef, orderBy("voteStatus", "desc"));

    getDocs(q)
      .then((data: DocumentData) => {
        setFilteredPosts(data.docs);
      })
      .catch((error) => alert(`ERROR: ${error}`));
  }

  async function filterRising() {
    const postsDocsRef = collection(db, "posts");

    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

    const q = query(
      postsDocsRef,
      where("createdAt", ">=", startOfDay),
      orderBy("voteStatus", "desc")
    );

    getDocs(q)
      .then((data: DocumentData) => {
        setFilteredPosts(data.docs);
      })
      .catch((error) => alert(`ERROR: ${error}`));
  }
  return (
    <div styleName="home">
      <div styleName="home__content">
        <div styleName="home__posts">
          <PostCreatorCard />
          <Filter />
          <Posts />
        </div>
        <aside styleName="aside">
          <TopCommunitiesCard />
          <PremiumCard />
          <PersonalHomeCard />
        </aside>
      </div>
    </div>
  );
};

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
