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
import Post from "../Post/Post";

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

  return (
    <section styleName="post-page">
      <div styleName="post-page__container">
        <div styleName="post-page__post">
          <Post
            styleName="post-page__post-component"
            data={location.state}
            renderHover={false}
          />
        </div>
        {/* <Votes voteStatus={voteStatus} />
      <article styleName="post-page__content">
        <div styleName="post-page__post">
          <PostAuthor />
          <h2 styleName="post-page__title">{title}</h2>
          <p styleName="post-page__description">{description}</p>
          <PostInteractions />
        </div>
      </article> */}
        <div styleName="post-page__comments">
          <CommentsSection />
        </div>
      </div>
      <aside styleName="aside">
        <About />
      </aside>
    </section>
  );
};

export default CSSModules(SinglePostPage, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
