import CSSModules from "react-css-modules";
import styles from "./ProfileNotFound.module.css";

const ProfileNotFound: React.FC = () => {
  return (
    <div styleName="profile-not-found">
      <h1>ok</h1>
    </div>
  );
};

export default CSSModules(ProfileNotFound, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
