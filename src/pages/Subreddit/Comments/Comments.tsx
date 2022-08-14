import s from "./Comments.module.css";
import Comment from "../Comment/Comment";

const Comments = () => {
  return (
    <div className={s["comments"]}>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  )
};

export default Comments;
