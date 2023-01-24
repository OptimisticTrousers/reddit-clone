import CSSModules from "react-css-modules";
import Card from "../../../components/Card/Card";
import styles from "./PremiumCard.module.css";
import redditShield from "../../../assets/reddit-shield.png";

const PremiumCard: React.FC = () => {
  return (
    <Card>
      <div styleName="premium-card">
        <div styleName="premium-card__content">
          <img
            styleName="premium-card__icon"
            src={redditShield}
            alt="reddit premium shield icon"
          />
          <div styleName="premium-card__text">
            <h3 styleName="premium-card__title">Reddit Premium</h3>
            <p styleName="premium-card__description">
              The best Reddit experience, with monthly Coins
            </p>
          </div>
        </div>
      </div>
      <div styleName="premium-card__button-container">
        <button styleName="premium-card__button">Try Now</button>
      </div>
    </Card>
  );
};

export default CSSModules(PremiumCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
