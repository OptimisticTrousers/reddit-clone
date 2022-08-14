import s from "./Votes.module.css";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import React from "react";

interface Props {
  voteStatus: number;
}

const Votes: React.FC<Props> = ({ voteStatus }) => {
  return (
    <div className={s["votes"]}>
      <BiUpvote />
      <p className={s["votes__likes"]}>{voteStatus}</p>
      <BiDownvote />
    </div>
  );
};

export default Votes;
