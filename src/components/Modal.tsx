import styles from "./Modal.module.css";
import CSSModules from "react-css-modules";

const Modal: React.FC = () => {
  return (
    <div styleName="modal">
      <div styleName="modal-content"></div>
    </div>
  );
};

export default CSSModules(Modal, styles, { allowMultiple: true });
