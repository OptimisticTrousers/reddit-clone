import CSSModules from "react-css-modules";
import styles from "./Main.module.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Main: React.FC<Props> = ({ children }) => {
  return <main>{children}</main>;
};

export default CSSModules(Main, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
