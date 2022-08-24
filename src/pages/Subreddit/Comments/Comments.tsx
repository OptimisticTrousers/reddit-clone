import styles from "./Comments.module.css";
import Comment from "../Comment/Comment";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  DocumentChange,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, getUser, getUserName } from "../../../firebase";
import CSSModules from "react-css-modules";
import EmptyComments from "../EmptyComments/EmptyComments";
import CommentInteractions from "../CommentInteractions/CommentInteractions";
import { useNavigate } from "react-router-dom";

interface Props {
  comments: DocumentData | undefined;
  postId: string | undefined;
  renderInteractions?: boolean;
  renderCommentPost?: boolean;
}

const Comments: React.FC<Props> = ({
  comments,
  postId,
  renderInteractions,
  renderCommentPost,
}) => {
  const [postTitle, setPostTitle] = useState();
  const [subredditName, setSubredditName] = useState();
  const [postCreator, setPostCreator] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (renderCommentPost) {
      if (postId) {
        console.log(postId);
        const postsDocRef = doc(db, "posts", postId);

        getDoc(postsDocRef).then((data: DocumentData) => {
          const docData = data?.data();
          setPostTitle(docData.title);
          setSubredditName(docData.subredditName);
          setPostCreator(docData.userName);
        });
      }
    }
  }, [postId, renderCommentPost]);
  const renderedComments = comments?.map((doc: DocumentData) => {
    return (
      <>
        {renderCommentPost && (
          <div
            styleName="comments__description"
            onClick={() => {
              navigate(`/r/${subredditName}/comments/${postId}`);
            }}
          >
            <a styleName="comments__user">{getUserName()}</a>
            <span styleName="comments__description">{`commented on '${postTitle}'`}</span>
            <a styleName="comments__text">{`r/${subredditName}`}</a>
            <span styleName="comments__description">{postCreator}</span>
          </div>
        )}
        <Comment key={doc?.id} comment={(doc?.data()) || doc.doc.data()}>
          {renderInteractions && (
            <CommentInteractions
              postId={postId}
              voteStatus={doc?.data()?.voteStatus}
              id={doc?.data()?.id}
            />
          )}
        </Comment>
      </>
    );
  });
  return (
    <div styleName="comments">
      {renderedComments == false ? <EmptyComments /> : renderedComments}
    </div>
  );
};

export default CSSModules(Comments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
