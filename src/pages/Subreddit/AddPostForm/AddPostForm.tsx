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
import s from "./AddPostForm.module.css";
import { nanoid } from "nanoid";
import { useAppSelector } from "../../../hooks/hooks";
import { selectAuthStatus } from "../../../features/auth/authSlice";
import { selectSubredditId } from "../../../features/subreddit/subredditSlice";

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
    // if (isLoggedIn) {
    const postsRef = collection(db, "posts");

    await addDoc(postsRef, {
      created_at: serverTimestamp(),
      id: nanoid(),
      subreddit_id: subredditId,
      user_id: getUserId(),
      title,
      description,
    });
    // } else {
    //   alert("Sign in please!");
    // }
  };

  return (
    <div className={s["post-creator"]}>
      <div className={s["post-creator__header"]}>
        <div className={s["post-creator__title"]}>Create a post</div>
        <div className={s["post-creator__drafts"]}>
          <button className={s["post-creator__button_type_drafts"]}>
            Drafts
          </button>
        </div>
        <div className={s["post-creator__subreddit-description"]}>
          New to the trade and have a question you need answered? Try the
          **Beginner Questions** thread posted at the top of the subreddit!
          Looking for feedback? Try our weekly **Feedback Thread** instead! If
          you're posting something you made or want feedback on, do so On
          Saturday.
        </div>
      </div>
      <div className={s["post-creator__form"]}>
        <div className={s["post-creator__post-types"]}>
          <button className={s["post-creator__button"]}>
            Post
            <span>Icon</span>
          </button>
          <button className={s["post-creator__button"]}>
            Images and Video
            <span>Icon</span>
          </button>
          <button className={s["post-creator__button"]}>
            Link
            <span>Icon</span>
          </button>
          <button className={s["post-creator__button"]}>
            Poll
            <span>Icon</span>
          </button>
          <button className={s["post-creator__button"]}>
            Talk
            <span>Icon</span>
          </button>
        </div>
        <div className={s["post-creator__inputs"]}>
          <div className={s["post-creator__input"]}>
            <textarea
              placeholder="Title"
              onChange={handleDescriptionChange}
              value={description}
              required
            ></textarea>
          </div>
          <div className={s["post-creator__input"]}>
            <textarea
              placeholder="Editor"
              onChange={handleTitleChange}
              value={title}
              required
            ></textarea>
          </div>
        </div>
        <div className={s["post-creator__marks"]}>
          <button>OC</button>
          <button>Spoiler</button>
          <button>NSFW</button>
          <button>Flair</button>
        </div>
        <hr />
        <div className={s["post-creator__buttons"]}>
          <button>Save Draft</button>
          <button onClick={submitPost}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default AddPostForm;
