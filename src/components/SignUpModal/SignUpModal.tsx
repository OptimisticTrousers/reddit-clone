import React from "react";
import CSSModules from "react-css-modules";
import Modal from "../Modal/Modal";
import styles from "./SignUpModal.module.css";

const SignUpModal: React.FC = () => {
  return (
    <Modal>
      <h1></h1>
    </Modal>
  );
};

export default CSSModules(SignUpModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
