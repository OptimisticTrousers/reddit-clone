import s from "./Post.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
const Post: React.FC = () => {
  return (
    <div className={s["post"]}>
      <div className={s["post__votes"]}></div>
      <BiUpvote />
      <p className={s["post__likes"]}>1</p>
      <BiDownvote />
      <div className={s["post__content"]}>
        <span>Image goes here</span>
        <div className={s["post__info"]}>
          <h3 className={s["post__title"]}>r/onepiee Lounge</h3>
          <span className={s["post__posted-by"]}>Posted by</span>
          <p className={s["post__author"]}>/u/TheWatchingBug</p>
          <span className={s["post__date"]}>4 months ago</span>
        </div>
        {/* {conditional rendering for sticky post} */}
        <div className={s["post__buttons"]}>
          <span>Expand</span>
          <div className={s["post__divider"]}></div>
          <div className={s["post__interactions"]}>
            <div className={s["post__interaction"]}>
              <span>Icon</span>
              <span>0 Comments</span>
            </div>
            <div className={s["post__interaction"]}>
              <span>Icon</span>
              <span>Award</span>
            </div>
            <div className={s["post__interaction"]}>
              <span>Icon</span>
              <span>Share</span>
            </div>
            <div className={s["post__interaction"]}>
              <span>Icon</span>
              <span>Save</span>
            </div>
            <div className={s["post__interaction"]}>
              <span>Icon</span>
              <span>Hide</span>
            </div>
            <div className={s["post__interaction"]}>
              <span>Icon</span>
              <span>Report</span>
            </div>
            <div className={s["post__interaction"]}>
              <span>Icon</span>
              <span>Tip</span>
            </div>
            {/* {conditional rendering for live chat} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
