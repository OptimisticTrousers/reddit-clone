import CSSModules from "react-css-modules";
import Card from "../../../components/Card/Card";
import styles from "./TopCommunities.module.css";
import { IoIosArrowUp } from "react-icons/io";

const TopCommunitiesCard: React.FC = () => {
  return (
    <Card>
      <div styleName="top-communities__top-community-image">
        <h2 styleName="top-communities__top-community-title">
          Top Communities
        </h2>
      </div>
      <ol styleName="top-communities__top-community-list">
        <li styleName="top-communities__top-community-item">
          <a styleName="top-communities__top-community-details">
            <p styleName="top-communities__top-community-rank">1</p>
            <IoIosArrowUp styleName="top-communities__top-community-icon" />
            <span styleName="top-communities__top-community-name">
              r/gaming
            </span>
          </a>
          <button styleName="top-communities__top-community-button top-communities__top-community-button_type_join">
            Join
          </button>
        </li>

        <li styleName="top-communities__top-community-item">
          <a styleName="top-communities__top-community-details">
            <p styleName="top-communities__top-community-rank">1</p>
            <IoIosArrowUp styleName="top-communities__top-community-icon" />
            <span styleName="top-communities__top-community-name">
              r/gaming
            </span>
          </a>
          <button styleName="top-communities__top-community-button top-communities__top-community-button_type_join">
            Join
          </button>
        </li>

        <li styleName="top-communities__top-community-item">
          <a styleName="top-communities__top-community-details">
            <p styleName="top-communities__top-community-rank">1</p>
            <IoIosArrowUp styleName="top-communities__top-community-icon" />
            <span styleName="top-communities__top-community-name">
              r/gaming
            </span>
          </a>
          <button styleName="top-communities__top-community-button top-communities__top-community-button_type_join">
            Join
          </button>
        </li>

        <li styleName="top-communities__top-community-item">
          <a styleName="top-communities__top-community-details">
            <p styleName="top-communities__top-community-rank">1</p>
            <IoIosArrowUp styleName="top-communities__top-community-icon" />
            <span styleName="top-communities__top-community-name">
              r/gaming
            </span>
          </a>
          <button styleName="top-communities__top-community-button top-communities__top-community-button_type_join">
            Join
          </button>
        </li>

        <li styleName="top-communities__top-community-item">
          <a styleName="top-communities__top-community-details">
            <p styleName="top-communities__top-community-rank">1</p>
            <IoIosArrowUp styleName="top-communities__top-community-icon" />
            <span styleName="top-communities__top-community-name">
              r/gaming
            </span>
          </a>
          <button styleName="top-communities__top-community-button top-communities__top-community-button_type_join">
            Join
          </button>
        </li>
      </ol>
      <button styleName="top-communities__top-community-button top-communities__top-community-button_type_view">
        View All
      </button>
    </Card>
  );
};

export default CSSModules(TopCommunitiesCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
