import styles from "./index.module.css";
import About from "./About/About";
import Posts from "./Posts/Posts";
import Header from "./Header/Header";
import CSSModules from "react-css-modules";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const Subreddit: React.FC = () => {
  const { subredditName } = useParams();

  useEffect(() => {
    async function newStuff() {
      const subredditsRef = collection(db, "subreddits");

      const q = query(subredditsRef, where("name", "==", subredditName));

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot)
    }
  });
  return (
    <div styleName="subreddit">
      <Header />
      <main styleName="main">
        <Posts />
        <aside styleName="aside">
          <About />
        </aside>
      </main>
    </div>
  );
};

export default CSSModules(Subreddit, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
