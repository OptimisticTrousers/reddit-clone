import CSSModules from "react-css-modules";
import styles from "./CommentInteractions.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import React from "react";

interface Props {
  voteStatus: number;
}

const CommentInteractions: React.FC<Props> = ({ voteStatus }) => {
  return (
    <div styleName="interactions">
      <BiUpvote styleName="interactions__icon" />
      <p styleName="interactions__vote">{voteStatus}</p>
      <BiDownvote styleName="interactions__icon" />
      <div styleName="interactions__reply">
        <BiMessage styleName="interactions__icon" />
        <button styleName="interactions__button">Reply</button>
      </div>
      <button styleName="interactions__button">Share</button>
      <button styleName="interactions__button">Report</button>
      <button styleName="interactions__button">Save</button>
      <button styleName="interactions__button">Follow</button>
    </div>
  );
};

export default CSSModules(CommentInteractions, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
