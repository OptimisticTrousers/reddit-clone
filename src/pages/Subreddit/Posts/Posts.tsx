import {
  collection,
  doc,
  DocumentChange,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import Post from "../Post/Post";
import styles from "./Posts.module.css";
import { db, getUserId } from "../../../firebase";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
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

  const location = useLocation();

  const { subredditName } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/user") return;
    if (!subredditName && posts !== undefined) return;
    else if (posts === undefined) {
      const postsRef = collection(db, "posts");

      const q = query(postsRef, orderBy("voteStatus", "desc"), limit(10));

      onSnapshot(q, (snapshot) => {
        const posts: DocumentData = [];

        snapshot.forEach((doc) => {
          posts.push(doc);
        });

        setRandomPosts(posts);
      });
    } else if (subredditName === undefined) {
      const postsRef = collection(db, "posts");

      const q = query(postsRef, where("subredditName", "==", subredditName));

      onSnapshot(q, (snapshot) => {
        const posts: DocumentData = [];

        snapshot.forEach((doc) => {
          posts.push(doc);
        });

        setRandomPosts(posts.slice(0, 10).sort(() => Math.random() - 0.5));
      });
    }
  }, [posts, subredditName, navigate, location.pathname]);

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
            to={`/r/${data?.subredditName}/comments/${doc.id}`}
            state={{ ...data, id: doc.id }}
          >
            <Post key={doc.id} data={{ ...data, id: doc.id }} />
          </Link>
        );
      })}
    </>
  );
};

export default CSSModules(Posts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
