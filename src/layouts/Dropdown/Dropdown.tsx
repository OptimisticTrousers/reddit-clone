import CSSModules from "react-css-modules";
import styles from "./Dropdown.module.css";
import { AiOutlinePlus } from "react-icons/ai";

const Dropdown: React.FC = () => {
  return (
    <div styleName="dropdown">
      <div styleName="dropdown__content">
        <p styleName="dropdown__my-communities">MY COMMUNITIES</p>
        <button styleName="dropdown__button">
          <AiOutlinePlus styleName="dropdown__icon"/>
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
