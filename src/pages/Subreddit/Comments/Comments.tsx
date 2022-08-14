import s from "./Comments.module.css";
import Comment from "../Comment/Comment";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentsRef = collection(db, "comments");

    getDocs(commentsRef).then((comments) => {
      setComments(comments);
    });
  }, []);

  return (
    <div className={s["comments"]}>
      {comments?.map(({ doc }) => {
        <Comment key={doc.id} comment={doc.data()} />;
      })}
    </div>
  );
};

export default Comments;
