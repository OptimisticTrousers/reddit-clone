import CSSModules from "react-css-modules";
import Posts from "../Subreddit/Posts/Posts";
import styles from "./Home.module.css";
import PremiumCard from "./PremiumCard/PremiumCard";
import TopCommunitiesCard from "./TopCommunitiesCard/TopCommunitiesCard";
import PostCreatorCard from "../../components/PostCreatorCard/PostCreatorCard";
import Filter from "../../components/Filter/Filter";
import PersonalHomeCard from "./PersonalHomeCard/PersonalHomeCard";

const Home: React.FC = () => {
  return (
    <div styleName="home">
      <div styleName="home__content">
        <div className="home__posts">
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
