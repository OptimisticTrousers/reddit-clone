import CSSModules from "react-css-modules";
import Reddit from "../../../components/Skeletons/Reddit";
import TaskList from "../../../components/Skeletons/TaskList";
import styles from "./ProfileNotFound.module.css";

interface Props {
  text: string;
}

const ProfileNotFound: React.FC<Props> = ({ text }) => {
  return (
    <div styleName="profile-not-found">
      <h2 styleName="profile-not-found__text">{text}</h2>
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
    </div>
  );
};

export default CSSModules(ProfileNotFound, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
