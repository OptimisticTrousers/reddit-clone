import CSSModules from "react-css-modules";
import { IoIosArrowDown } from "react-icons/io";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/CardHeader/CardHeader";
import { selectSubredditData } from "../../../features/subreddit/subredditSlice";
import { useAppSelector } from "../../../hooks/hooks";
import styles from "./About.module.css";

const About: React.FC = () => {
  const {
    created_at,
    creator_id,
    description,
    id,
    name,
    number_of_members,
    privacy_type,
  } = useAppSelector(selectSubredditData);
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
        <p styleName="about__date"></p>
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
