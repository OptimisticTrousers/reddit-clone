import CSSModules from "react-css-modules";
import Card from "../../../components/Card/Card";
import styles from "./PersonalHomeCard.module.css";

const PersonalHomeCard: React.FC = () => {
  return (
    <Card>
      <div styleName="personal-home-card">
        <div styleName="personal-home-card__banner"></div>
        <div styleName="personal-home-card__title">
          <img
            styleName="personal-home-card__image"
            src="https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png"
            alt="redditor"
          />
          <span styleName="personal-home-card__text">Home</span>
        </div>
        <p styleName="personal-home-card__description">
          Your personal Reddit frontpage. Come here to check in with your
          favorite communities.
        </p>
        <div styleName="personal-home-card__buttons">
          <button styleName="personal-home-card__button personal-home-card__button_type_create-post">Create Post</button>
          <button styleName="personal-home-card__button personal-home-card__button_type_create-community">Create Community</button>
        </div>
      </div>
    </Card>
  );
};

export default CSSModules(PersonalHomeCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
