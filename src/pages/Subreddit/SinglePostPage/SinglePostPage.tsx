import s from "./SinglePost.module.css";

const SinglePostPage = () => {
  return (
    <section>
      <article className={s["post"]}>
        <h2>Title</h2>
        <p className={s["post__content"]}>description of stuff</p>
      </article>
    </section>
  );
};

export default SinglePostPage;
