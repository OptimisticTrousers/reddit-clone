import CSSModules from "react-css-modules";
import styles from "./FakePost.module.css";
import upVote from "../../../assets/upvote.svg";
import downVote from "../../../assets/downvote.svg";

const FakePost: React.FC = () => {
  return (
    <div styleName="fake-post">
      <div styleName="fake-post__votes">
        <img src={upVote} alt="up vote" />
        <img src={downVote} alt="down vote" />
      </div>
      <div styleName="fake-post__post">

      </div>
    </div>
  );
};

export default CSSModules(FakePost, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
