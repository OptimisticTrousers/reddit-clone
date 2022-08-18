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


interface Props {
  comments: DocumentData | undefined;
}

const Comments: React.FC<Props> = ({ comments }) => {
  return (
    <div styleName="comments">
      {comments?.map(({ doc }: DocumentData) => {
        console.log(doc?.data());
        return <Comment key={doc.id} comment={doc.data()} />;
      })}
    </div>
  );
};

export default CSSModules(Comments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
