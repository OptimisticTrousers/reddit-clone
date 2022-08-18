import CSSModules from "react-css-modules";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/CardHeader/CardHeader";
import { selectCommunityData } from "../../../features/subreddit/subredditSlice";
import { useAppSelector } from "../../../hooks/hooks";
import styles from "./About.module.css";

const About: React.FC = () => {
  const { description, number_of_members, created_at } =
    useAppSelector(selectCommunityData);

  return (
    <Card>
      <CardHeader />
      <p styleName="about__description">{description}</p>
      <div styleName="about__members">
        <div styleName="about__block">
          <div styleName="about__number">{number_of_members}</div>
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
        <p styleName="about__date">
          {new Date(created_at * 100).toDateString()}
        </p>
      </div>
      <Link to="submit">
        <button styleName="about__button about__button_type_create">
          Create Post
        </button>
      </Link>
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
