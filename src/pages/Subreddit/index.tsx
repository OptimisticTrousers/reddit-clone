import s from "./index.module.css";
import About from "./About/About";
import Posts from "./Posts/Posts";

const Subreddit: React.FC = () => {
  return (
    <div className={s["subreddit"]}>
      <main>
        <Posts />
      </main>
      <aside>
        <About />
      </aside>
    </div>
  );
};

export default Subreddit;
