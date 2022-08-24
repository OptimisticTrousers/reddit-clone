import CSSModules from "react-css-modules";
import styles from "./CommentInteractions.module.css";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import React from "react";
import { doc, increment, writeBatch } from "firebase/firestore";
import { db } from "../../../firebase";

interface Props {
  voteStatus: number;
  id: string;
  postId: string | undefined;
}

const CommentInteractions: React.FC<Props> = ({ voteStatus, id, postId }) => {
  const onDeleteComment = async () => {
    try {
      if (postId) {
        const batch = writeBatch(db);

        const commentDocRef = doc(db, "comments", id);

        batch.delete(commentDocRef);

        const postDocRef = doc(db, "posts", postId);
        batch.update(postDocRef, {
          numberOfComments: increment(-1),
        });

        await batch.commit();
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };
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
      <button styleName="interactions__button" onClick={onDeleteComment}>
        Delete
      </button>
    </div>
  );
};

export default CSSModules(CommentInteractions, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
