import CSSModules from "react-css-modules";
import Filter from "../../components/Filter/Filter";
import About from "../Subreddit/About/About";
import Posts from "../Subreddit/Posts/Posts";
import styles from "./Home.module.css";
import Card from "../../components/Card/Card";
import { IoIosArrowUp } from "react-icons/io";
import PremiumCard from "./PremiumCard/PremiumCard";

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
                <a styleName="home__top-community-details">
                  <p styleName="home__top-community-rank">1</p>
                  <IoIosArrowUp styleName="home__top-community-icon" />
                  <span styleName="home__top-community-name">r/gaming</span>
                </a>
                <button styleName="home__top-community-button home__top-community-button_type_join">
                  Join
                </button>
              </li>

              <li styleName="home__top-community-item">
                <a styleName="home__top-community-details">
                  <p styleName="home__top-community-rank">1</p>
                  <IoIosArrowUp styleName="home__top-community-icon" />
                  <span styleName="home__top-community-name">r/gaming</span>
                </a>
                <button styleName="home__top-community-button home__top-community-button_type_join">
                  Join
                </button>
              </li>

              <li styleName="home__top-community-item">
                <a styleName="home__top-community-details">
                  <p styleName="home__top-community-rank">1</p>
                  <IoIosArrowUp styleName="home__top-community-icon" />
                  <span styleName="home__top-community-name">r/gaming</span>
                </a>
                <button styleName="home__top-community-button home__top-community-button_type_join">
                  Join
                </button>
              </li>

              <li styleName="home__top-community-item">
                <a styleName="home__top-community-details">
                  <p styleName="home__top-community-rank">1</p>
                  <IoIosArrowUp styleName="home__top-community-icon" />
                  <span styleName="home__top-community-name">r/gaming</span>
                </a>
                <button styleName="home__top-community-button home__top-community-button_type_join">
                  Join
                </button>
              </li>

              <li styleName="home__top-community-item">
                <a styleName="home__top-community-details">
                  <p styleName="home__top-community-rank">1</p>
                  <IoIosArrowUp styleName="home__top-community-icon" />
                  <span styleName="home__top-community-name">r/gaming</span>
                </a>
                <button styleName="home__top-community-button home__top-community-button_type_join">
                  Join
                </button>
              </li>
            </ol>
            <button styleName="home__top-community-button home__top-community-button_type_view">
              View All
            </button>
          </Card>
          <PremiumCard />
        </aside>
      </div>
    </div>
  );
};

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
