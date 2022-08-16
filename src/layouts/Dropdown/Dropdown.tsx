import CSSModules from "react-css-modules";
import styles from "./Dropdown.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "../../hooks/hooks";
import { toggleCommunityModalState } from "../../features/subreddit/subredditSlice";

const Dropdown: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div styleName="dropdown">
      <div styleName="dropdown__content">
        <p styleName="dropdown__my-communities">MY COMMUNITIES</p>
        <button
          styleName="dropdown__button"
          onClick={() => dispatch(toggleCommunityModalState())}
        >
          <AiOutlinePlus styleName="dropdown__icon" />
          Create Community
        </button>
      </div>
    </div>
  );
};

export default CSSModules(Dropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
