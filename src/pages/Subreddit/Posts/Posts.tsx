import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "../Post/Post";
import s from "./Post.module.css";
import { db } from "../../../firebase";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const subredditPostsRef = doc(db, "subreddit", "posts");
    getDoc(subredditPostsRef).then((subredditPosts: any) =>
      // console.log(subredditPosts.data().posts)
      setPosts(subredditPosts.data().posts)
    );
  }, []);

  return (
    <div className={s["container"]}>
      <Post />
    </div>
  );
};

export default Posts;
