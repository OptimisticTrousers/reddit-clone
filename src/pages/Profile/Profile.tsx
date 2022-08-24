import CSSModules from "react-css-modules";
import Header from "./Header/Header";
import styles from "./Profile.module.css";

const Profile: React.FC = () => {
  return (
    <div>
      <Header />
      <h1></h1>
    </div>
  );
};

export default CSSModules(Profile, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
