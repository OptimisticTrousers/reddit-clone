import CSSModules from "react-css-modules";
import styles from "./EmptyComments.module.css";

const EmptyComments: React.FC = () => {
  return (
    <div>
      <h1>Okay</h1>
    </div>
  );
};

export default CSSModules(EmptyComments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
