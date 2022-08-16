import CSSModules from "react-css-modules";
import Card from "../Card/Card";
import styles from "./Filter.module.css";
import { AiOutlineRocket } from "react-icons/ai";
import { HiOutlineFire } from "react-icons/hi";
import { MdOutlineNewReleases } from "react-icons/md";
import { MdOutlineLeaderboard } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { BsFillInboxesFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const Filter: React.FC = () => {
  return (
    <Card>
      <div styleName="filter">
        <div styleName="filter__categories">
          <a styleName="filter__category">
            <AiOutlineRocket styleName="filter__icon" />
            <span>Best</span>
          </a>
          <a styleName="filter__category">
            <HiOutlineFire styleName="filter__icon" />
            <span>Hot</span>
          </a>
          <a styleName="filter__category">
            <MdOutlineNewReleases styleName="filter__icon" />
            <span>New</span>
          </a>
          <a styleName="filter__category">
            <MdOutlineLeaderboard styleName="filter__icon" />
            <span>Top</span>
          </a>
          <a styleName="filter__category">
            <BsThreeDots />
          </a>
        </div>
        <div styleName="filter__category">
          <BsFillInboxesFill styleName="filter__icon" />
          <IoIosArrowDown styleName="filter__icon" />
        </div>
      </div>
    </Card>
  );
};

export default CSSModules(Filter, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
