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
        <div styleName="filter__picture">
          <img
            styleName="filter__profile-icon"
            src="https://styles.redditmedia.com/t5_g2km0/styles/profileIcon_snood9e1c00c-b1c6-46a9-a231-a6fcd78cdd16-headshot.png?width=256&height=256&frame=1&crop=256:256,smart&s=7bd48be150588ab7dc3dc5c73be4d0dcddeeae8d"
            alt="default reddit profile"
          />
        </div>
        <input styleName="filter__input" placeholder="Create Post" />
        <a styleName="filter__icon-link">
          <AiOutlinePicture styleName="filter__icon" />
        </a>
        <a styleName="filter__icon-link">
          <BsLink45Deg styleName="filter__icon" />
        </a>
      </div>
    </Card>
  );
};

export default CSSModules(Filter, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
