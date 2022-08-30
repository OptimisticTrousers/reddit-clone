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
    async function fetchPosts() {

      try {

    if (renderCommentPost) {
      if (postId) {
        const postsDocRef = doc(db, "posts", postId);

        const postsDoc = await getDoc(postsDocRef)

          const docData = postsDoc?.data();

          setPostTitle(docData?.title);
          setSubredditName(docData?.subredditName);
          setPostCreator(docData?.userName);

      }
    }
      } catch(error) {
        console.log(`ERROR: ${error}`)
      }
    }
  }, [postId, renderCommentPost]);

  function navigateToPost() {
    navigate(`/r/${subredditName}/comments/${postId}`);
  }

  const renderedComments = comments?.map((doc: DocumentData) => {
    let docData;
    if (doc?.data) {
      docData = doc?.data();
    } else {
      docData = doc?.doc?.data();
    }
    return (
      <>
        {renderCommentPost && (
          <div styleName="comments__description" onClick={navigateToPost}>
            <p styleName="comments__user">{getUserName()}</p>
            <span styleName="comments__description">{`commented on '${postTitle}'`}</span>
            <p styleName="comments__text">{`r/${subredditName}`}</p>
            <span styleName="comments__description">{postCreator}</span>
          </div>
        )}
        <Comment key={doc?.id} comment={docData}>
          {renderInteractions && (
            <CommentInteractions
              postId={postId}
              voteStatus={docData?.voteStatus}
              id={docData?.id}
            />
          )}
        </Comment>
      </>
    );
  });
  return (
    <div styleName="comments">
      {renderedComments?.length === 0 ? <EmptyComments /> : renderedComments}
    </div>
  );
};

export default CSSModules(Comments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
