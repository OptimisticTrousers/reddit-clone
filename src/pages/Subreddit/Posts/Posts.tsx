import Post from "../Post/Post";
import s from "./Post.module.css";

const Posts: React.FC = () => {
  return (
    <div className={s["container"]}>
      <Post />
    </div>
  );
};

export default Posts;
