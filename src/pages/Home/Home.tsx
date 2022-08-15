import CSSModules from "react-css-modules";
import Filter from "../../components/Filter/Filter";
import About from "../Subreddit/About/About";
import Posts from "../Subreddit/Posts/Posts";
import styles from "./Home.module.css";
import Card from "../../components/Card/Card";

const Home: React.FC = () => {
  return (
    <div styleName="home">
      <Filter />
      <div styleName="home__content">
        <div className="home__posts">
          <Posts />
        </div>
        <aside>
          <Card>
            <div styleName="home__top-community-image">
              <h2 styleName="home__top-community-title">Top Communities</h2>
            </div>
          <ol styleName="home__top-community-list">
            <li styleName="home__top-community-item">
              <div className="home__top-community-details">
                <p>1</p>
                <img />
                <span>r/gaming</span>
              </div>
              <div styleName="home__top-community-button">
                <button>Join</button>
              </div>
            </li>
          </ol>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
