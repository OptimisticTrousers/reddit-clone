import CSSModules from "react-css-modules";
import { IoIosArrowDown } from "react-icons/io";
import Card from "../../../components/Card/Card";
import styles from "./About.module.css";

const About: React.FC = () => {
  return (
    <Card>
      <div styleName="about__top">
        <h2 styleName="about__title">About Community</h2>
      </div>
      <p styleName="about__description">
        Make r/onepiece into r/onepiee in r/place
      </p>
      <div styleName="about__members">
        <div styleName="about__block">
          <div styleName="about__number">3</div>
          <div styleName="about__member">Members</div>
        </div>
        <div styleName="about__block">
          <div styleName="about__number">4</div>
          <div styleName="about__member">Online</div>
        </div>
      </div>
      <hr styleName="about__thematic-break"></hr>
      <div styleName="about__cakeday">
        <span styleName="about__icon"></span>
        <p styleName="about__date">Created Apr 4, 2022</p>
      </div>
      <button styleName="about__button about__button_type_create">
        Create Post
      </button>
      <hr styleName="about__thematic-break"></hr>
      <button styleName="about__button about__button_type_options">
        Community Options
        <IoIosArrowDown />
      </button>
    </Card>
  );
};

export default CSSModules(About, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
