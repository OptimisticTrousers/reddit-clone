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
import { useAppSelector, useFilter } from "../../hooks/hooks";
import { selectCommunityData } from "../../features/subreddit/subredditSlice";
import Main from "../../layouts/Main/Main";
import Aside from "../../layouts/Aside/Aside";
import TechStackCard from "./TechStackCard/TechStackCard";

const Home: React.FC = () => {
  const [filteredPosts, setFilteredPosts] = useState<
    DocumentData | undefined
  >();

  const { filterRising, filterTop, filterNew } = useFilter();

  const { name } = useAppSelector(selectCommunityData);

  async function addPosts(promise: Promise<DocumentData>) {
    const data = await promise;
    setFilteredPosts(data);
  }

  return (
    <div styleName="home">
      <Main>
        <div styleName="home__posts">
          {name && <PostCreatorCard />}
          <Filter
            addPosts={addPosts}
            filterRising={filterRising}
            filterTop={filterTop}
            filterNew={filterNew}
          />
          <Posts posts={filteredPosts} />
        </div>
        <Aside>
          <TopCommunitiesCard />
          <PremiumCard />
          <PersonalHomeCard />
          <TechStackCard />
        </Aside>
      </Main>
    </div>
  );
};

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
