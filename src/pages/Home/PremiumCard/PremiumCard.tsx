import CSSModules from "react-css-modules";
import Card from "../../../components/Card/Card";
import styles from "./PremiumCard.module.css";

const PremiumCard: React.FC = () => {
  return (
    <Card>
      <div styleName="premium-card">
      </div>
      <div styleName="premium-card__button-container">
        <button styleName="premium-card__button">Try Now</button>
      </div>
    </Card>
  );
};

export default CSSModules(PremiumCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
