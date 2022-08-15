import CSSModules from "react-css-modules";
import Filter from "../../components/Filter/Filter";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div>
      <Filter />
    </div>
  );
};

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
