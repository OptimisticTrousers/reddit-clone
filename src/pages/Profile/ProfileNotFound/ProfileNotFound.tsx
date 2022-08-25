import CSSModules from "react-css-modules";
import Reddit from "../../../components/Skeletons/Reddit";
import TaskList from "../../../components/Skeletons/TakeList";
import styles from "./ProfileNotFound.module.css";

const ProfileNotFound: React.FC = () => {
  return (
    <div styleName="profile-not-found">
      <h2 styleName="profile-not-found__text">
        hmm... /uLocoOptimisticPollo hasn't commented anything
      </h2>
      <div styleName="profile-not-found__skeletons">
        <Reddit
          backgroundColor={"#333"}
          foregroundColor={"#999"}
          animate={true}
          speed={1}
        />
        <Reddit
          backgroundColor={"#333"}
          foregroundColor={"#999"}
          animate={true}
          speed={1}
        />
        <Reddit
          backgroundColor={"#333"}
          foregroundColor={"#999"}
          animate={true}
          speed={1}
        />
        <Reddit
          backgroundColor={"#333"}
          foregroundColor={"#999"}
          animate={true}
          speed={1}
        />
        <Reddit
          backgroundColor={"#333"}
          foregroundColor={"#999"}
          animate={true}
          speed={1}
        />
      </div>
      {/* <TaskList backgroundColor={"#333"} foregroundColor={"#999"} animate={true} speed={1} />
      <TaskList backgroundColor={"#333"} foregroundColor={"#999"} animate={true} speed={1} />
      <TaskList backgroundColor={"#333"} foregroundColor={"#999"} animate={true} speed={1} />
      <TaskList backgroundColor={"#333"} foregroundColor={"#999"} animate={true} speed={1} /> */}
    </div>
  );
};

export default CSSModules(ProfileNotFound, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
