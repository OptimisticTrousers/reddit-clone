import {
  collection,
  doc,
  DocumentChange,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import PostExcerpt from "../PostExcerpt/PostExcerpt";
import s from "./Posts.module.css";
import { db } from "../../../firebase";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";

// type PostsType = Array<{
//   title: string;
//   description: string;
//   id: string;
// }> | null;

type PostsType = DocumentChange<DocumentData>[];

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostsType | null>(null);

  useEffect(() => {
    const subredditPostsRef = collection(db, "posts");

    getDocs(subredditPostsRef).then((subredditPosts) => {
      setPosts(subredditPosts.docChanges());
    });
  }, []);

  return (
    <div className={s["container"]}>
      {posts?.map(({ doc }) => {
        const data = doc.data();
        return (
          <Link key={doc.id} to={doc.id} state={{ ...data }}>
            <PostExcerpt key={doc.id} data={data} />
          </Link>
        );
      })}
    </div>
  );
};

export default Posts;
