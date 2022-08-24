import CSSModules from "react-css-modules";
import styles from "./Header.module.css"

const Header: React.FC = () => {
  return (
    <div styleName="header">
      <div styleName="header__tabs">
        <a styleName="header__tab">
          Overview
        </a>
        <a styleName="header__tab">
          Posts
        </a>
        <a styleName="header__tab">
          Comments
        </a>
        <a styleName="header__tab">
          Saved
        </a>
        <a styleName="header__tab">
          Upvoted
        </a>
        <a styleName="header__tab">
          Downvotes
        </a>
      </div>
    </div>
  );
};

export default CSSModules(Header, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
