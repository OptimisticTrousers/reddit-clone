import CSSModules from "react-css-modules";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./ProfileDropdown.module.css";

const ProfileDropdown: React.FC = () => {
  return (
    <Dropdown>
      <h1>okay</h1>
    </Dropdown>
  );
};

export default CSSModules(ProfileDropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
