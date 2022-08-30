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
  filterRising: () => Promise<DocumentData>;
  filterNew: () => Promise<DocumentData>;
  filterTop: () => Promise<DocumentData>;
  addPosts: (promise: Promise<DocumentData>) => void;
}

const Filter: React.FC<Props> = ({
  filterRising,
  filterNew,
  filterTop,
  addPosts,
}) => {

  return (
    <Card>
      <div styleName="filter">
        <div styleName="filter__categories">
          <button
            styleName="filter__category"
            onClick={() => addPosts(filterRising())}
          >
            <HiOutlineFire styleName="filter__icon" />
            <span>Rising</span>
          </button>
          <button styleName="filter__category" onClick={() => addPosts(filterNew())}>
            <MdOutlineNewReleases styleName="filter__icon" />
            <span>New</span>
          </button >
          <button styleName="filter__category" onClick={() => addPosts(filterTop())}>
            <MdOutlineLeaderboard styleName="filter__icon" />
            <span>Top</span>
          </button>
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
