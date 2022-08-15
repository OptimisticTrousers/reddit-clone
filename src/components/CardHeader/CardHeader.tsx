import CSSModules from "react-css-modules";
import styles from "./CardHeader.module.css";

const CardHeader: React.FC = () => {
  return (
    <div styleName="card-header__top">
      <h2 styleName="card-header__title">About Community</h2>
    </div>
  );
};

export default CSSModules(CardHeader, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
