import CSSModules from "react-css-modules";
import styles from "./EmptyComments.module.css";
import emptyComments from "../../../assets/empty-comments.svg";

const EmptyComments: React.FC = () => {
  return (
    <div styleName="empty-comments">
      <div styleName="empty-comments__content">
        <svg
          styleName="empty-comments__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M15 4V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h1V6a2 2 0 0 1 2-2z"></path>
          <path d="M17 5H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3.36l1.76 1.83a.5.5 0 0 0 .75 0L13.64 16H17a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z"></path>
        </svg>
        <p styleName="empty-comments__title">No Comments Yet</p>
        <p styleName="empty-comments__description">
          Be the first to share what you think!
        </p>
      </div>
    </div>
  );
};

export default CSSModules(EmptyComments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
