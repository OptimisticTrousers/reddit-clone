import s from "./Modal.module.css";
const Modal: React.FC = () => {
  return (
    <div className={s["modal"]}>
      <div className="modal-content"></div>
    </div>
  );
};

export default Modal;
