import CSSModules from "react-css-modules";
import styles from "./Card.module.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Card: React.FC<Props> = ({ children }) => {
  return <div styleName="card">{children}</div>;
};

export default CSSModules(Card, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
