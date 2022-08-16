/* eslint-disable jsx-a11y/img-redundant-alt */
import CSSModules from "react-css-modules";
import Card from "../Card/Card";
import styles from "./Filter.module.css";
import { AiOutlinePicture } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";

const Filter: React.FC = () => {
  return (
    <Card>
      <div styleName="filter">
        <input styleName="filter__input" />
        <a>
          <AiOutlinePicture />
        </a>
        <a>
          <BsLink45Deg />
        </a>
      </div>
    </Card>
  );
};

export default CSSModules(Filter, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
