import styles from "./CommentsSection.module.css";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  increment,
  Query,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { db, getUserId, getUserName } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Comments from "../Comments/Comments";
import {
  selectAuthStatus,
  toggleSignInModal,
} from "../../../features/auth/authSlice";
import CSSModules from "react-css-modules";
import upsideDownTriangle from "../../../assets/upside-down-triangle.svg";
import { selectCommunityData } from "../../../features/subreddit/subredditSlice";
import NestedList from "../../../components/Skeletons/AvatarWithText";
import AvatarWithText from "../../../components/Skeletons/AvatarWithText";

interface Props {
  postId: string | undefined;
  comments: DocumentData | undefined;
}

const CommentsSection: React.FC<Props> = ({ comments, postId }) => {
  const [commentText, setCommentText] = useState("");

  const { id } = useAppSelector(selectCommunityData);
  const isLoggedIn = useAppSelector(selectAuthStatus);

  const dispatch = useAppDispatch();

  const handleCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setCommentText(event.target.value);
  };

  const formSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (isLoggedIn) {
      const commentsRef = collection(db, "comments");
      await addDoc(commentsRef, {
        content: commentText,
        createdAt: serverTimestamp(),
        id: nanoid(),
        subredditId: id,
        postId,
        updatedAt: serverTimestamp(),
        userName: getUserName(),
        userId: getUserId(),
        voteStatus: 0,
      });

      const postRef = doc(db, "posts", `${postId}`);

      await updateDoc(postRef, {
        commentsQuantity: increment(1),
      });

      setCommentText("");
    } else {
      dispatch(toggleSignInModal());
    }
  };


  return (
    <div styleName="comments-section">
      {comments?.length !== 0 && (
        <>
          <div styleName="comments-section__user">
            <span styleName="comments-section__comment-as">
              Comment as{" "}
              <span styleName="comments-section__username">
                {getUserName()}
              </span>
            </span>
          </div>
          <form onSubmit={formSubmit}>
            <div styleName="comments-section__comments-form">
              <textarea
                styleName="comments-section__comments-form-textarea"
                placeholder="What are your thoughts?"
                onChange={handleCommentChange}
                value={commentText}
                required
              ></textarea>
              <div styleName="comments-section__comments-form-button-container">
                <button
                  type="submit"
                  styleName="comments-section__comments-form-button"
                >
                  Comment
                </button>
              </div>
            </div>
            <div styleName="comments-section__filter">
              <button styleName="comments-section__button">
                Sort By: Best
              </button>
              <img
                styleName="comments-section__icon"
                src={upsideDownTriangle}
                alt="tiny upside down triangle"
              />
            </div>
          </form>
          <hr />
          <div styleName="comments-section__discussion">
            <a styleName="comments-section__hyperlink">
              View discussions in 1 other community
            </a>
          </div>
        </>
      )}
      {comments ? (
        <Comments comments={comments} />
      ) : (
        <div styleName="comments-section__skeletons">
          <div>
            <AvatarWithText
              styleName="comments-section__skeleton"
              width="100%"
              height={100}
              animate={true}
              backgroundColor={"#333"}
              foregroundColor={"#999"}
              speed={1}
            />
          </div>
          <div>
            <AvatarWithText
              styleName="comments-section__skeleton"
              width="100%"
              height={100}
              animate={true}
              backgroundColor={"#333"}
              foregroundColor={"#999"}
              speed={1}
            />
          </div>
          <div>
            <AvatarWithText
              styleName="comments-section__skeleton"
              width="100%"
              height={100}
              animate={true}
              backgroundColor={"#333"}
              foregroundColor={"#999"}
              speed={1}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CSSModules(CommentsSection, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
