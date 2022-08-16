import CSSModules from "react-css-modules";
import styles from "./Dropdown.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "../../hooks/hooks";
import { toggleCommunityModalState } from "../../features/subreddit/subredditSlice";

interface Props {
  children: JSX.Element | JSX.Element[];
  dropdown: string;
}
const Dropdown: React.FC<Props> = ({ children, dropdown }) => {
  return (
    <div
      styleName={`dropdown ${
        dropdown === "community" ? "community-width" : "profile-width"
      }`}
    >
      <div styleName="dropdown__content">{children}</div>
    </div>
  );
};

export default CSSModules(Dropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
