import CSSModules from "react-css-modules";
import styles from "./Dropdown.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "../../hooks/hooks";
import { toggleCommunityModalState } from "../../features/subreddit/subredditSlice";

interface Props {
  children: JSX.Element | JSX.Element[];
}
const Dropdown: React.FC<Props> = ({ children }) => {
  return (
    <div styleName="dropdown">
      <div styleName="dropdown__content">{children}</div>
    </div>
  );
};

export default CSSModules(Dropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
