import CSSModules from "react-css-modules";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./ProfileDropdown.module.css";
import logOutIcon from "../../assets/log-out-icon.svg";
import { signOutUser } from "../../firebase";

interface Props {
  dropdown: string;
}

const ProfileDropdown: React.FC<Props> = ({ dropdown }) => {
  return (
    <Dropdown dropdown={dropdown}>
      <div styleName="profile-dropdown">
        <button styleName="profile-dropdown__button" onClick={signOutUser}>
          <img
            styleName="profile-dropdown__icon"
            src={logOutIcon}
            alt="log out icon"
          />
          Log Out
        </button>
      </div>
    </Dropdown>
  );
};

export default CSSModules(ProfileDropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
