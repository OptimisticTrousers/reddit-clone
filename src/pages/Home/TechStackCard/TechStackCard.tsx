import CSSModules from "react-css-modules";
import Card from "../../../components/Card/Card";
import styles from "./TechStackCard.module.css";

const TechStackCard: React.FC = () => {
  return (
    <Card>
      <h1>Hi</h1>
    </Card>
  );
};

export default CSSModules(TechStackCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
