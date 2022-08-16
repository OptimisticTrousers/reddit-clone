import CSSModules from "react-css-modules";
import styles from "./Dropdown.module.css";

const Dropdown: React.FC = () => {
  return (
    <div styleName="dropdown">
      <div styleName="dropdown__content">
        <p>MY COMMUNITIES</p>
        <button>Create Community</button>
      </div>
    </div>
  );
};

export default CSSModules(Dropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
