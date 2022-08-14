import s from "./index.module.css";
import About from "./About/About";
import Posts from "./Posts/Posts";
import Header from "./Header/Header";

const Subreddit: React.FC = () => {
  return (
    <div className={s["subreddit"]}>
      <Header />
      <main className={s["main"]}>
        <Posts />
        <aside>
          <About />
        </aside>
      </main>
    </div>
  );
};

export default Subreddit;
