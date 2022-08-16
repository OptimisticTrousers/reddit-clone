import styles from "./Modal.module.css";
import CSSModules from "react-css-modules";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Modal: React.FC<Props> = ({ children }) => {
  return <div styleName="modal">{children}</div>;
};

export default CSSModules(Modal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
