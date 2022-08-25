import CSSModules from "react-css-modules";
import TaskList from "../../../components/Skeletons/TakeList";
import styles from "./ProfileNotFound.module.css";

const ProfileNotFound: React.FC = () => {
  return (
    <div styleName="profile-not-found">
      <h2 styleName="profile-not-found__text">hmm... /uLocoOptimisticPollo hasn't commented anything</h2>
      <TaskList backgroundColor={"#333"} foregroundColor={"#999"} animate={true} speed={1}/>
    </div>
  );
};

export default CSSModules(ProfileNotFound, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
