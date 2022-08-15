import About from "../About/About";
import Comments from "../Comments/Comments";
import PostAuthor from "../PostAuthor/PostAuthor";
import PostInteractions from "../PostInteractions/PostInteractions";
import Votes from "../Votes/Votes";
import styles from "./SinglePost.module.css";
import { useLocation } from "react-router-dom";
import { Location } from "react-router-dom";
import CommentsSection from "../CommentsSection/CommentsSection";
import CSSModules from "react-css-modules";

type LocationState = {
  title: string;
  description: string;
  created_at: string;
  id: string;
  subreddit_id: string;
  updated_at: string;
  user_id: string;
  voteStatus: number;
};

const SinglePostPage = () => {
  const location = useLocation();

  const { title, description, voteStatus } = location.state as LocationState;

  return (
    <section styleName="post-page">
      <Votes voteStatus={voteStatus} />
      <article styleName="post-page__content">
        <div styleName="post-page__post">
          <PostAuthor />
          <h2 styleName="post-page__title">{title}</h2>
          <p styleName="post-page__description">{description}</p>
          <PostInteractions />
        </div>
        <div styleName="post-page__comments">
          <CommentsSection />
        </div>
      </article>
      <aside>
        <About />
      </aside>
    </section>
  );
};

export default CSSModules(SinglePostPage, styles, { allowMultiple: true });
