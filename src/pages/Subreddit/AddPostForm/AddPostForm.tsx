import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { SyntheticEvent, useState } from "react";
import { db, getUserId } from "../../../firebase";
import styles from "./AddPostForm.module.css";
import { nanoid } from "nanoid";
import { useAppSelector } from "../../../hooks/hooks";
import { selectAuthStatus } from "../../../features/auth/authSlice";
import { selectSubredditId } from "../../../features/subreddit/subredditSlice";
import CSSModules from "react-css-modules";

type InputEvent = React.ChangeEvent<HTMLTextAreaElement>;

const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isLoggedIn = useAppSelector(selectAuthStatus);

  const subredditId = useAppSelector(selectSubredditId);

  const handleTitleChange = (event: InputEvent) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: InputEvent) => {
    setDescription(event.target.value);
  };

  const submitPost = async () => {
    if (isLoggedIn) {
      const postsRef = collection(db, "posts");

      await addDoc(postsRef, {
        created_at: serverTimestamp(),
        id: nanoid(),
        subreddit_id: subredditId,
        voteStatus: 0,
        post_id: "lSXBVO-I64XcdFEljHGii",
        user_id: getUserId(),
        title,
        description,
      });
    } else {
      alert("Sign in please!");
    }
  };

  return (
    <div styleName="post-creator">
      <div styleName="post-creator__header">
        <div styleName="post-creator__title">Create a post</div>
        <div styleName="post-creator__drafts">
          <button styleName="post-creator__button_type_drafts">Drafts</button>
        </div>
        <div styleName="post-creator__subreddit-description">
          New to the trade and have a question you need answered? Try the
          **Beginner Questions** thread posted at the top of the subreddit!
          Looking for feedback? Try our weekly **Feedback Thread** instead! If
          you're posting something you made or want feedback on, do so On
          Saturday.
        </div>
      </div>
      <div styleName="post-creator__form">
        <div styleName="post-creator__post-types">
          <button styleName="post-creator__button">
            Post
            <span>Icon</span>
          </button>
          <button styleName="post-creator__button">
            Images and Video
            <span>Icon</span>
          </button>
          <button styleName="post-creator__button">
            Link
            <span>Icon</span>
          </button>
          <button styleName="post-creator__button">
            Poll
            <span>Icon</span>
          </button>
          <button styleName="post-creator__button">
            Talk
            <span>Icon</span>
          </button>
        </div>
        <div styleName="post-creator__inputs">
          <div styleName="post-creator__input">
            <textarea
              placeholder="Title"
              onChange={handleDescriptionChange}
              value={description}
              required
            ></textarea>
          </div>
          <div styleName="post-creator__input">
            <textarea
              placeholder="Editor"
              onChange={handleTitleChange}
              value={title}
              required
            ></textarea>
          </div>
        </div>
        <div styleName="post-creator__marks">
          <button>OC</button>
          <button>Spoiler</button>
          <button>NSFW</button>
          <button>Flair</button>
        </div>
        <hr />
        <div styleName="post-creator__buttons">
          <button>Save Draft</button>
          <button onClick={submitPost}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(AddPostForm, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
