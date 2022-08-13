import s from "./PostAuthor.module.css";

const PostAuthor = () => {
  return (
    <div className={s["post-excerpt__info"]}>
      <span className={s["post-excerpt__posted-by"]}>Posted by</span>
      <p className={s["post-excerpt__author"]}>/u/TheWatchingBug</p>
      <span className={s["post-excerpt__date"]}>4 months ago</span>
    </div>
  );
};

export default PostAuthor;
