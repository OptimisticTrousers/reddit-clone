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
import Dropdown from "../../../layouts/Dropdown/Dropdown";

interface Props {
  postId: string | undefined;
  comments: DocumentData | undefined;
  filterRising: () => void;
  filterNew: () => void;
  filterTop: () => void;
}

const CommentsSection: React.FC<Props> = ({
  comments,
  postId,
  filterRising,
  filterNew,
  filterTop,
}) => {
  const [commentText, setCommentText] = useState("");
  const [isFilterDropdownActive, setIsFilterDropdownActive] = useState(false);

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

    const docId = nanoid();

    if (isLoggedIn) {
      try {
        const commentsRef = doc(db, "comments", docId);
        await setDoc(commentsRef, {
          content: commentText,
          createdAt: serverTimestamp(),
          id: docId,
          subredditId: id,
          postId,
          parentId: null,
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
      } catch (error) {
        alert(`Could not create comment. Please try again: ${error}`);
      }
    } else {
      dispatch(toggleSignInModal());
    }
  };

  function handleFilterDropdown() {
    setIsFilterDropdownActive((prevValue) => !prevValue);
  }

  return (
    <div styleName="comments-section">
      <div styleName="comments-section__user">
        <span styleName="comments-section__comment-as">
          Comment as{" "}
          <span styleName="comments-section__username">{getUserName()}</span>
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
        <div
          styleName="comments-section__filter"
          onClick={handleFilterDropdown}
        >
          <button type="button" styleName="comments-section__button">
            Sort By: Best
          </button>
          <img
            styleName="comments-section__icon"
            src={upsideDownTriangle}
            alt="tiny upside down triangle"
          />
        </div>
        {isFilterDropdownActive && (
          <Dropdown dropdown="profile-width">
            <button
              styleName="comments-section__filter-button"
              onClick={filterRising}
            >
              Rising
            </button>
            <button
              styleName="comments-section__filter-button"
              onClick={filterTop}
            >
              Top
            </button>
            <button
              styleName="comments-section__filter-button"
              onClick={filterNew}
            >
              New
            </button>
          </Dropdown>
        )}
      </form>
      <hr />

      {comments ? (
        <Comments comments={comments} commentsPostId={postId} />
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
  handleNotFoundStyleName: "ignore",
});
