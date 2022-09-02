import CSSModules from "react-css-modules";
import styles from "./CommentForm.module.css";

const CommentForm: React.FC = () => {
  return (
    <form>
      <div styleName="comment-form-row">
        <textarea styleName="message-input" />
        <button styleName="btn">Post</button>
      </div>
    </form>
  );
};

export default CSSModules(CommentForm, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
