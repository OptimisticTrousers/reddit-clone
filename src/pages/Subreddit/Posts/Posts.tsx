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

interface Props {
  posts?: DocumentData;
}

const Posts: React.FC<Props> = ({ posts }) => {
  const [randomPosts, setRandomPosts] = useState<DocumentData | undefined>(
    undefined
  );

  useEffect(() => {
    if (posts === undefined) {
      const postsRef = collection(db, "posts");

      getDocs(postsRef).then((posts) =>
        setRandomPosts(posts.docs.sort((a, b) => Math.random() - 0.5))
      );
    }
  }, [posts]);
  return (
    <div styleName="container">
      {(posts ?? randomPosts)?.map((doc: DocumentData) => {
        const data = doc.data();
        return (
          <Link key={doc.id} to={`/r/${data.subredditName}/comments/${doc.id}`} state={{ ...data }}>
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
