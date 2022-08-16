import CSSModules from "react-css-modules";
import Modal from "../Modal/Modal";
import styles from "./CommunityModal.module.css";

const CommunityModal: React.FC = () => {
  return (
    <Modal>
      <h1>stuff</h1>
    </Modal>
  );
};

export default CSSModules(CommunityModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
