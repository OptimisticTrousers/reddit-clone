import { BiMessage } from "react-icons/bi";
import s from "./PostInteractions.module.css";

const PostInteractions = () => {
  return (
    <div className={s["post-excerpt__interactions"]}>
      <div className={s["post-excerpt__interaction"]}>
        <BiMessage />
        <span>0 Comments</span>
      </div>
      <div className={s["post-excerpt__interaction"]}>
        <span>Icon</span>
        <span>Share</span>
      </div>
      <div className={s["post-excerpt__interaction"]}>
        <span>Icon</span>
        <span>Save</span>
      </div>
      <div className={s["post-excerpt__interaction"]}>
        <span>Icon</span>
        <span>Hide</span>
      </div>
      <div className={s["post-excerpt__interaction"]}>
        <span>Icon</span>
        <span>Report</span>
      </div>
      {/* {conditional rendering for live chat} */}
    </div>
  );
};

export default PostInteractions;
