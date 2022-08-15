import CSSModules from "react-css-modules";
import Filter from "../../components/Filter/Filter";
import About from "../Subreddit/About/About";
import Posts from "../Subreddit/Posts/Posts";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div styleName="home">
      <Filter />
      <div styleName="home__content">
        <div className="home__posts">
          <Posts />
        </div>
        <aside>
          <About />
        </aside>
      </div>
    </div>
  );
};

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
