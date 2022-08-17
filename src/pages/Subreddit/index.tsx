import styles from "./index.module.css";
import About from "./About/About";
import Posts from "./Posts/Posts";
import Header from "./Header/Header";
import CSSModules from "react-css-modules";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAppDispatch } from "../../hooks/hooks";
import { getSubredditData } from "../../features/subreddit/subredditSlice";

const Subreddit: React.FC = () => {
  const { subredditName } = useParams();
  const dispatch =  useAppDispatch();

  useEffect(() => {
    const subredditsRef = collection(db, "subreddits");

    const q = query(subredditsRef, where("name", "==", subredditName));

    onSnapshot(q, (snapshot) => {
      if (snapshot.docs[0]?.data()) {
        dispatch(getSubredditData(snapshot.docs[0]?.data()));
      } else {
        alert("SUBREDDIT NOT FOUND");
      }
    });
  }, [subredditName, dispatch]);

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
