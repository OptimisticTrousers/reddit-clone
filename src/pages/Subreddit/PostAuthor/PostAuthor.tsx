import CSSModules from "react-css-modules";
import styles from "./PostAuthor.module.css";

const PostAuthor = () => {
  return (
    <div styleName="post-excerpt__info">
      <span styleName="post-excerpt__posted-by">Posted by</span>
      <p styleName="post-excerpt__author">/u/TheWatchingBug</p>
      <span styleName="post-excerpt__date">4 months ago</span>
    </div>
  );
};

export default CSSModules(PostAuthor, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
