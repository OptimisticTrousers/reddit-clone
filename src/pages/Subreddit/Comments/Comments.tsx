import s from "./Comments.module.css";
import Comment from "../Comment/Comment";
import { useEffect, useState } from "react";
import {
  collection,
  DocumentChange,
  DocumentData,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";

type CommentsType = DocumentChange<DocumentData>[];

const Comments = () => {
  const [comments, setComments] = useState<CommentsType | null>(null);

  useEffect(() => {
    const commentsRef = collection(db, "comments");

    getDocs(commentsRef).then((comments) => {
      setComments(comments.docChanges());
    });
  }, []);

  return (
    <div className={s["comments"]}>
      {comments?.map(({ doc }) => {
        return <Comment key={doc.id} comment={doc.data()} />;
      })}
    </div>
  );
};

export default Comments;
