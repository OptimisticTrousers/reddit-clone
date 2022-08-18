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

type CommentsType = DocumentData;

interface Props {
  postId: string | undefined;
}

const Comments: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<CommentsType | null>(null);

  useEffect(() => {
    const commentsRef = collection(db, "comments");

    const q = query(commentsRef, where("post_id", "==", postId));

    onSnapshot(q, (snapshot) => {
      console.log(snapshot.docChanges())
      setComments(snapshot.docChanges());
    });

  //   getDocs(q).then((comments) => {
  //     setComments(comments.docs);
  //   });
  }, [postId]);

  return (
    <div styleName="comments">
      {comments?.map(({doc}: DocumentData) => {
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
