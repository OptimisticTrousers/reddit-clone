import CSSModules from "react-css-modules";
import styles from "./CommentInteractions.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";

const CommentInteractions = () => {
  return (
    <div styleName="interactions">
      <BiUpvote />
      <p>1</p>
      <BiDownvote />
      <div styleName="interactions__reply">
        <BiMessage />
        <p>Reply</p>
      </div>
      <p>Share</p>
      <p>Report</p>
      <p>Save</p>
      <p>Follow</p>
    </div>
  );
};

export default CSSModules(CommentInteractions, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
