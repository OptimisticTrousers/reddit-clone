import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { db, getUserId, getUserName } from "../../../firebase";
import styles from "./AddPostForm.module.css";
import { nanoid } from "nanoid";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  selectAuthStatus,
  toggleSignInModal,
} from "../../../features/auth/authSlice";
import { selectCommunityData } from "../../../features/subreddit/subredditSlice";
import CSSModules from "react-css-modules";
import { HiOutlineDocumentText } from "react-icons/hi";
import { AiOutlinePicture } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import { HiOutlineMicrophone } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ImageSelector from "../CreatePost/ImageSelector/ImageSelector";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;

type FormEvent = React.FormEvent<HTMLFormElement>;

const AddPostForm: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isLoggedIn = useAppSelector(selectAuthStatus);

  const { id, name } = useAppSelector(selectCommunityData);

  const [selectedFile, setSelectedFile] = useState<string>("");

  const [selectedTab, setSelectedTab] = useState("post");

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  const dispatch = useAppDispatch();

  const handleTitleChange = (event: InputEvent) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: TextAreaEvent) => {
    setDescription(event.target.value);
  };

  const submitPost = async (event: FormEvent) => {
    event.preventDefault();
    if (isLoggedIn) {
      try {
        const postsRef = collection(db, "posts");

        const postId = nanoid();

        addDoc(postsRef, {
          createdAt: serverTimestamp(),
          id: postId,
          subredditId: id,
          subredditName: name,
          voteStatus: 0,
          postId: nanoid(),
          userId: getUserId(),
          userName: getUserName(),
          title,
          description,
          commentsQuantity: 0,
        }).then((postRef) => {
          navigate(`/r/${name}/comments/${postRef.id}`);
        });
      } catch (error) {
        console.log(`ERROR: ${error}`);
      }
    } else {
      dispatch(toggleSignInModal());
    }
  };

  const selectedFileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div styleName="post-creator">
      <div styleName="post-creator__header">
        <div styleName="post-creator__top">
          <div styleName="post-creator__title">Create a post</div>
          {/* <button styleName="post-creator__button_type_drafts">Drafts</button> */}
        </div>
        {/* <div styleName="post-creator__subreddit-choice-container">
          <div styleName="post-creator__subreddit-choice">
          </div>
        </div> */}
        <div styleName="post-creator__subreddit-description">
          Creating a post to the{" "}
          <span styleName="post-creator__subreddit-name">{`'${name}'`}</span>{" "}
          subreddit
          {/* New to the trade and have a question you need answered? Try the
          **Beginner Questions** thread posted at the top of the subreddit!
          Looking for feedback? Try our weekly **Feedback Thread** instead! If
          you're posting something you made or want feedback on, do so On
          Saturday. */}
        </div>
      </div>
      <div styleName="post-creator__form">
        <div styleName="post-creator__post-types">
          <button
            styleName={`post-creator__button ${
              selectedTab === "post" && "post-creator__button--active"
            }`}
            onClick={() => setSelectedTab("post")}
          >
            <HiOutlineDocumentText styleName="post-creator__icon" />
            Post
          </button>
          <button
            styleName={`post-creator__button ${
              selectedTab === "image" && "post-creator__button--active"
            }`}
            onClick={() => setSelectedTab("image")}
          >
            <AiOutlinePicture styleName="post-creator__icon" />
            Media
          </button>
          <button
            styleName={`post-creator__button ${
              selectedTab === "link" && "post-creator__button--active"
            }`}
            onClick={() => setSelectedTab("link")}
          >
            <BsLink45Deg styleName="post-creator__icon" />
            Link
          </button>
          <button
            styleName={`post-creator__button ${
              selectedTab === "poll" && "post-creator__button--active"
            }`}
            onClick={() => setSelectedTab("poll")}
          >
            <BiPoll styleName="post-creator__icon" />
            Poll
          </button>
          <button
            styleName={`post-creator__button ${
              selectedTab === "talk" && "post-creator__button--active"
            }`}
            onClick={() => setSelectedTab("talk")}
          >
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
            {selectedTab === "post" && (
              <div styleName="post-creator__input-container">
                <textarea
                  styleName="post-creator__input post-creator__input_type_textarea"
                  placeholder="Editor"
                  onChange={handleDescriptionChange}
                  value={description}
                  required
                ></textarea>
              </div>
            )}
            {selectedTab === "image" && <ImageSelector onSelectImage={onSelectImage} setSelectedTab={setSelectedTab} setSelectedFile={setSelectedFile} />}
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
