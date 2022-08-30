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
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import CSSModules from "react-css-modules";
import { useAppSelector } from "../../../hooks/hooks";
import AuthorsList from "../../../components/Skeletons/AuthorsList";

interface Props {
  posts?: DocumentData;
}

const Posts: React.FC<Props> = ({ posts }) => {
  const [randomPosts, setRandomPosts] = useState<DocumentData | undefined>(
    undefined
  );

  const { subredditName } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!subredditName && posts !== undefined) return;
    else if (posts === undefined) {
      const postsRef = collection(db, "posts");

      getDocs(postsRef)
        .then((posts) => {
          if (posts) {
            setRandomPosts(posts.docs.sort((a, b) => Math.random() - 0.5));
          } else {
            alert("Subreddit does not exist!");
            navigate("/");
          }
        })
        .catch((error) => alert(`ERROR: ${error}`));
    } else if (subredditName === undefined) {
      const postsRef = collection(db, "posts");

      const q = query(postsRef, where("subredditName", "==", subredditName));

      getDocs(q)
        .then((posts) => {
          if (posts) {
            setRandomPosts(
              posts.docs.slice(0, 10).sort((a, b) => Math.random() - 0.5)
            );
          } else {
            alert("Subreddit does not exist!");
            navigate("/");
          }
        })
        .catch((error) => alert(`ERROR: ${error}`));
    }
  }, [posts, subredditName, navigate]);

  if (posts === undefined && randomPosts === undefined) {
    return (
      <AuthorsList
        width="100%"
        animate={true}
        backgroundColor={"#333"}
        foregroundColor={"#999"}
        speed={1}
      />
    );
  }
  return (
    <>
      {(posts ?? randomPosts)?.map((doc: DocumentData) => {
        const data = doc.data();
        return (
          <Link
            key={doc.id}
            to={`/r/${data.subredditName}/comments/${doc.id}`}
            state={{ ...data }}
          >
            <Post
              key={doc.id}
              data={{ ...data, id: doc.id }}
            />
          </Link>
        );
      })}
    </>
  );
};

export default CSSModules(Posts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
