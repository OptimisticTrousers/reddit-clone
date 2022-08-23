import CSSModules from "react-css-modules";
import styles from "./EmptyComments.module.css";

const EmptyComments: React.FC = () => {
  return (
    <div styleName="empty-comments">
      <div styleName="empty-comments__content">
        
      </div>
    </div>
  );
};

export default CSSModules(EmptyComments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
