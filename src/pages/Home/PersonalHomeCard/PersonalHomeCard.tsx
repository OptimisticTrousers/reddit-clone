import CSSModules from "react-css-modules";
import Card from "../../../components/Card/Card";
import styles from "./PersonalHomeCard.module.css";

const PersonalHomeCard: React.FC = () => {
  return (
    <Card>
      <img src="https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png" alt="home banner" />
    </Card>
  );
};

export default CSSModules(PersonalHomeCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
