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
import { DocumentData } from "firebase/firestore";

interface Props {
  filterRising: () => Promise<void>;
  filterNew: () => Promise<void>;
  filterTop: () => Promise<void>;
}

const Filter: React.FC<Props> = ({ filterRising, filterNew, filterTop }) => {
  return (
    <Card>
      <div styleName="filter">
        <div styleName="filter__categories">
          {/* <a styleName="filter__category" onClick={}>
            <AiOutlineRocket styleName="filter__icon" />
            <span>Best</span>
          </a> */}
          <a styleName="filter__category" onClick={filterRising}>
            <HiOutlineFire styleName="filter__icon" />
            <span>Rising</span>
          </a>
          <a styleName="filter__category" onClick={filterNew}>
            <MdOutlineNewReleases styleName="filter__icon" />
            <span>New</span>
          </a>
          <a styleName="filter__category" onClick={filterTop}>
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
