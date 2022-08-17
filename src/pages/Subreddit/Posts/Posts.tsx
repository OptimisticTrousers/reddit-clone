import {
  collection,
  doc,
  DocumentChange,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import Post from "../Post/Post";
import styles from "./Posts.module.css";
import { db } from "../../../firebase";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import { useAppSelector } from "../../../hooks/hooks";
import { selectSubredditData } from "../../../features/subreddit/subredditSlice";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<any>(null);

  const subredditId = useAppSelector(
    (state) => state.subreddit.subredditData.id
  );

  return (
    <div styleName="container">
      {posts?.map(({ doc }: any) => {
        const data = doc.data();
        return (
          <Link key={doc.id} to={`/r/subreddit/${doc.id}`} state={{ ...data }}>
            <Post key={doc.id} data={data} renderHover={true} />
          </Link>
        );
      })}
    </div>
  );
};

export default CSSModules(Posts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
