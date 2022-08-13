import s from "./PostExcerpt.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import Votes from "../Votes/Votes";
import PostAuthor from "../PostAuthor/PostAuthor";

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
        <PostAuthor />
        <div className={s["post-excerpt__container"]}>
          <h3 className={s["post-excerpt__title"]}>{title}</h3>
          <p className={s["post-excerpt__description"]}>{description}</p>
        </div>
        {/* {conditional rendering for sticky post} */}
        <div className={s["post__buttons"]}>
          <span>Expand</span>
          <div className={s["post-excerpt__divider"]}></div>
        </div>
      </div>
    </div>
  );
};

export default PostExcerpt;
