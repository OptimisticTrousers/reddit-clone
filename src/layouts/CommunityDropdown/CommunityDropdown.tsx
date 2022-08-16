import CSSModules from "react-css-modules";
import { useAppDispatch } from "../../hooks/hooks";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./CommunityDropdown.module.css";
import { toggleCommunityModalState } from "../../features/subreddit/subredditSlice";
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  dropdown: string;
}

const CommunityDropdown: React.FC<Props> = ({ dropdown }) => {
  const dispatch = useAppDispatch();
  return (
    <Dropdown dropdown={dropdown}>
      <div styleName="community__dropdown">
        <p styleName="community__dropdown-my-communities">MY COMMUNITIES</p>
        <button
          styleName="community__dropdown-button"
          onClick={() => dispatch(toggleCommunityModalState())}
        >
          <AiOutlinePlus styleName="community__dropdown-icon" />
          Create Community
        </button>
      </div>
    </Dropdown>
  );
};

export default CSSModules(CommunityDropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
