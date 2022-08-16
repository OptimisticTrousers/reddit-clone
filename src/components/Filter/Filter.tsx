import CSSModules from "react-css-modules";
import Card from "../Card/Card";
import styles from "./Filter.module.css";

const Filter: React.FC = () => {
  return (
    <Card>
      <div>
        <h1></h1>
      </div>
    </Card>
  );
};

export default CSSModules(Filter, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
