import s from "./Votes.module.css";
import { BiUpvote, BiDownvote } from "react-icons/bi";
const Votes = () => {
  return (
    <div className={s["votes"]}>
      <BiUpvote />
      <p className={s["votes__likes"]}>1</p>
      <BiDownvote />
    </div>
  );
};

export default Votes;
