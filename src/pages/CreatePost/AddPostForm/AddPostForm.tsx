import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { db, getUserId, getUserName } from "../../../firebase";
import styles from "./AddPostForm.module.css";
import { nanoid } from "nanoid";
import { useAppSelector } from "../../../hooks/hooks";
import { selectAuthStatus } from "../../../features/auth/authSlice";
import { selectCommunityData } from "../../../features/subreddit/subredditSlice";
import CSSModules from "react-css-modules";
import { HiOutlineDocumentText } from "react-icons/hi";
import { AiOutlinePicture } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import { HiOutlineMicrophone } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;

type FormEvent = React.FormEvent<HTMLFormElement>;

const AddPostForm: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isLoggedIn = useAppSelector(selectAuthStatus);

  const { id, name } = useAppSelector(selectCommunityData);

  const handleTitleChange = (event: InputEvent) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: TextAreaEvent) => {
    setDescription(event.target.value);
  };

  const submitPost = async (event: FormEvent) => {
    event.preventDefault();
    if (isLoggedIn) {
      const postsRef = collection(db, "posts");

      const postRef = await addDoc(postsRef, {
        created_at: serverTimestamp(),
        id: nanoid(),
        subredditId: id,
        subredditName: name,
        voteStatus: 0,
        postId: nanoid(),
        userId: getUserId(),
        userName: getUserName(),
        title,
        description,
        commentsQuantity: 0,
      });
      setTimeout(() => {
        navigate(`/r/${name}/comments/${postRef.id}`);
      }, 1000);
    } else {
      alert("Sign in please!");
    }
  };

  return (
    <div styleName="post-creator">
      <div styleName="post-creator__header">
        <div styleName="post-creator__top">
          <div styleName="post-creator__title">Create a post</div>
          {/* <button styleName="post-creator__button_type_drafts">Drafts</button> */}
        </div>
        <div styleName="post-creator__subreddit-description">
          {/* New to the trade and have a question you need answered? Try the
          **Beginner Questions** thread posted at the top of the subreddit!
          Looking for feedback? Try our weekly **Feedback Thread** instead! If
          you're posting something you made or want feedback on, do so On
          Saturday. */}
        </div>
      </div>
      <div styleName="post-creator__form">
        <div styleName="post-creator__post-types">
          <button styleName="post-creator__button">
            <HiOutlineDocumentText styleName="post-creator__icon" />
            Post
          </button>
          <button styleName="post-creator__button">
            <AiOutlinePicture styleName="post-creator__icon" />
            Video
          </button>
          <button styleName="post-creator__button">
            <BsLink45Deg styleName="post-creator__icon" />
            Link
          </button>
          <button styleName="post-creator__button">
            <BiPoll styleName="post-creator__icon" />
            Poll
          </button>
          <button styleName="post-creator__button">
            <HiOutlineMicrophone styleName="post-creator__icon" />
            Talk
          </button>
        </div>
        <form onSubmit={submitPost}>
          <div styleName="post-creator__inputs">
            <div styleName="post-creator__input-container">
              <input
                styleName="post-creator__input post-creator__input_type_input"
                placeholder="Title"
                onChange={handleTitleChange}
                value={title}
                required
              />
            </div>
            <div styleName="post-creator__input-container">
              <textarea
                styleName="post-creator__input post-creator__input_type_textarea"
                placeholder="Editor"
                onChange={handleDescriptionChange}
                value={description}
                required
              ></textarea>
            </div>
          </div>
          {/* <div styleName="post-creator__marks">
          <button>OC</button>
          <button>Spoiler</button>
          <button>NSFW</button>
          <button>Flair</button>
        </div> */}
          <div styleName="post-creator__post-buttons">
            {/* <button>Save Draft</button> */}
            <button type="submit" styleName="post-creator__post-button">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CSSModules(AddPostForm, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
