import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import PostExcerpt from "../PostExcerpt/PostExcerpt";
import s from "./Posts.module.css";
import { db } from "../../../firebase";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";

type PostsType = Array<{
  title: string;
  description: string;
  id: string;
}> | null;

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostsType | null>(null);

  useEffect(() => {
    const subredditPostsRef = doc(db, "subreddit", "posts");
    getDoc(subredditPostsRef).then((subredditPosts) =>
      setPosts(subredditPosts?.data()?.posts)
    );
  }, []);

  return (
    <div className={s["container"]}>
      {posts?.map((post) => {
        return (
          <PostExcerpt
            key={post.id}
            title={post.title}
            description={post.description}
          />
        );
      })}
    </div>
  );
};

export default Posts;
