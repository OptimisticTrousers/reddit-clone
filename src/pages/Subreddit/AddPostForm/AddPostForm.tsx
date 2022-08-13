import { setDoc } from "firebase/firestore";
import React, { SyntheticEvent, useState } from "react";
import s from "./AddPostForm.module.css";

type InputEvent = React.ChangeEvent<HTMLTextAreaElement>;
type FormEvent = React.FormEvent<HTMLFormElement>;

const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event: InputEvent) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: InputEvent) => {
    setDescription(event.target.value);
  };

  const submitPost = async() => {


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
              ></textarea>
            </div>
            <div className={s["post-creator__input"]}>
              <textarea
                placeholder="Editor"
                onChange={handleTitleChange}
                value={title}
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
