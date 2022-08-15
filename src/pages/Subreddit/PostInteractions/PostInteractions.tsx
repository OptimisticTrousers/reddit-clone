import CSSModules from "react-css-modules";
import { BiMessage } from "react-icons/bi";
import styles from "./PostInteractions.module.css";

const PostInteractions = () => {
  return (
    <div styleName="post-excerpt__interactions">
      <div styleName="post-excerpt__interaction">
        <BiMessage />
        <span>0 Comments</span>
      </div>
      <div styleName="post-excerpt__interaction">
        <span>Icon</span>
        <span>Share</span>
      </div>
      <div styleName="post-excerpt__interaction">
        <span>Icon</span>
        <span>Save</span>
      </div>
      <div styleName="post-excerpt__interaction">
        <span>Icon</span>
        <span>Hide</span>
      </div>
      <div styleName="post-excerpt__interaction">
        <span>Icon</span>
        <span>Report</span>
      </div>
      {/* {conditional rendering for live chat} */}
    </div>
  );
};

export default CSSModules(PostInteractions, styles, { allowMultiple: true });
