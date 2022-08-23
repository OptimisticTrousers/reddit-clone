import styles from "./Comments.module.css";
import Comment from "../Comment/Comment";
import React, { useEffect, useState } from "react";
import {
  collection,
  DocumentChange,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import CSSModules from "react-css-modules";
import EmptyComments from "../EmptyComments/EmptyComments";


interface Props {
  comments: DocumentData | undefined;
  postId: string | undefined;
}

const Comments: React.FC<Props> = ({ comments, postId }) => {

  const renderedComments = comments?.map(({ doc }: DocumentData) => {
        return <Comment key={doc.id} comment={doc.data()} postId={postId}/>;
      })
  return (
    <div styleName="comments">
      {}
      {renderedComments.length === 0 ? <EmptyComments /> : renderedComments}
    </div>
  );
};

export default CSSModules(Comments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
