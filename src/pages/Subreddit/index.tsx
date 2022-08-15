import styles from "./index.module.css";
import About from "./About/About";
import Posts from "./Posts/Posts";
import Header from "./Header/Header";
import CSSModules from "react-css-modules";

const Subreddit: React.FC = () => {
  return (
    <div styleName="subreddit">
      <Header />
      <main styleName="main">
        <Posts />
        <aside>
          <About />
        </aside>
      </main>
    </div>
  );
};

export default CSSModules(Subreddit, styles, { allowMultiple: true });
