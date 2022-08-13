import s from "./PostExcerpt.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import Votes from "../Votes/Votes";

interface Props {
  title: string;
  description: string;
}
const PostExcerpt: React.FC<Props> = ({ title, description }) => {
  return (
    <div className={s["post-excerpt"]}>
      <Votes />
      <div className={s["post-excerpt__content"]}>
        {/* <span>Image goes here</span> */}
        <div className={s["post-excerpt__info"]}>
          <span className={s["post-excerpt__posted-by"]}>Posted by</span>
          <p className={s["post-excerpt__author"]}>/u/TheWatchingBug</p>
          <span className={s["post-excerpt__date"]}>4 months ago</span>
        </div>
        <div className={s["post-excerpt__container"]}>
          <h3 className={s["post-excerpt__title"]}>{title}</h3>
          <p className={s["post-excerpt__description"]}>{description}</p>
        </div>
        {/* {conditional rendering for sticky post} */}
        <div className={s["post__buttons"]}>
          <span>Expand</span>
          <div className={s["post-excerpt__divider"]}></div>
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
        </div>
      </div>
    </div>
  );
};

export default PostExcerpt;
