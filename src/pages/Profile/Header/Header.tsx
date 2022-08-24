import CSSModules from "react-css-modules";
import styles from "./Header.module.css";

interface Action {
  type: string;
}

interface State {
  posts: boolean;
  comments: boolean;
  upvotes: boolean;
  downvotes: boolean;
  saved: boolean;
}
interface Props {
  dispatch: (action: Action) => void;
  activeSection: State;
}

const Header: React.FC<Props> = ({
  dispatch,
  activeSection: { posts, comments, upvotes, downvotes, saved },
}) => {
  return (
    <div styleName="header">
      <div styleName="header__tabs">
        <a
          styleName={`header__tab ${posts && "header__tab--active"}`}
          onClick={() => dispatch({ type: "POSTS" })}
        >
          Posts
        </a>
        <a
          styleName={`header__tab ${comments && "header__tab--active"}`}
          onClick={() => dispatch({ type: "COMMENTS" })}
        >
          Comments
        </a>
        <a
          styleName={`header__tab ${saved && "header__tab--active"}`}
          onClick={() => dispatch({ type: "SAVED" })}
        >
          Saved
        </a>
        <a
          styleName={`header__tab ${upvotes && "header__tab--active"}`}
          onClick={() => dispatch({ type: "UPVOTES" })}
        >
          Upvoted
        </a>
        <a
          styleName={`header__tab ${downvotes && "header__tab--active"}`}
          onClick={() => dispatch({ type: "DOWNVOTES" })}
        >
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
