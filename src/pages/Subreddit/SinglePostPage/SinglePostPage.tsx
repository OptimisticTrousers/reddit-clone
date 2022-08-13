import About from "../About/About";
import PostAuthor from "../PostAuthor/PostAuthor";
import PostInteractions from "../PostInteractions/PostInteractions";
import Votes from "../Votes/Votes";
import s from "./SinglePost.module.css";

const SinglePostPage = () => {
  return (
    <section className={s["post-page"]}>
      <Votes />
      <article className={s["post-page__content"]}>
        <PostAuthor />
        <h2 className={s["post-page__title"]}>Title</h2>
        <p className={s["post-page__description"]}>description of stuff</p>
        <PostInteractions />
      </article>
      <aside>
        <About />
      </aside>
    </section>
  );
};

export default SinglePostPage;
