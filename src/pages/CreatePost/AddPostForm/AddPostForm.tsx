import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { SyntheticEvent, useRef, useState } from "react";
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
import ImageSelector from "../ImageSelector/ImageSelector";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../../../firebase/firebase-config";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;

type FormEvent = React.FormEvent<HTMLFormElement>;

const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedTab, setSelectedTab] = useState("post");

  const {
    id,
    name,
    description: communityDescription,
  } = useAppSelector(selectCommunityData);
  const isLoggedIn = useAppSelector(selectAuthStatus);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleTitleChange = (event: InputEvent) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: TextAreaEvent) => {
    setDescription(event.target.value);
  };

  function handleTabChange(type: string) {
    setSelectedTab(type);
  }

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

  const submitPost = async (event: FormEvent) => {
    event.preventDefault();
    if (isLoggedIn) {
      try {
        const postId = nanoid();

        const postsRef = doc(db, "posts", postId);

        await setDoc(postsRef, {
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
          link,
          commentsQuantity: 0,
        });

        if (selectedFile) {
          const imageRef = ref(storage, `posts/${postId}`);
          await uploadString(imageRef, selectedFile, "data_url");
          const downloadURL = await getDownloadURL(imageRef);

          await updateDoc(postsRef, {
            imageURL: downloadURL,
          });
        }

        navigate(`/r/${name}/comments/${postId}`);
      } catch (error) {
        alert(`Could not create post. Please try again: ${error}`);
      }
    } else {
      dispatch(toggleSignInModal());
    }
  };

  return (
    <div styleName="post-creator">
      <div styleName="post-creator__header">
        <div styleName="post-creator__top">
          <div styleName="post-creator__title">Create a post</div>
        </div>
        <div styleName="post-creator__subreddit-description">
          Creating a post to the{" "}
          <span styleName="post-creator__subreddit-name">{`'${name}'`}</span>{" "}
          subreddit
        </div>
        <p styleName="post-creator__subreddit-description">
          Subreddit Description: {communityDescription}
        </p>
      </div>
      <div styleName="post-creator__form">
        <div styleName="post-creator__post-types">
          <button
            styleName={`post-creator__button ${
              selectedTab === "post" && "post-creator__button--active"
            }`}
            onClick={() => handleTabChange("post")}
          >
            <HiOutlineDocumentText styleName="post-creator__icon" />
            Post
          </button>
          <button
            styleName={`post-creator__button ${
              selectedTab === "image" && "post-creator__button--active"
            }`}
            onClick={() => handleTabChange("image")}
          >
            <AiOutlinePicture styleName="post-creator__icon" />
            Media
          </button>
          <button
            styleName={`post-creator__button ${
              selectedTab === "link" && "post-creator__button--active"
            }`}
            onClick={() => handleTabChange("link")}
          >
            <BsLink45Deg styleName="post-creator__icon" />
            Link
          </button>
          <button
            styleName={`post-creator__button ${
              selectedTab === "poll" && "post-creator__button--active"
            }`}
            onClick={() => handleTabChange("poll")}
          >
            <BiPoll styleName="post-creator__icon" />
            Poll
          </button>
          <button
            styleName={`post-creator__button ${
              selectedTab === "talk" && "post-creator__button--active"
            }`}
            onClick={() => handleTabChange("talk")}
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
            {selectedTab === "image" && (
              <ImageSelector
                onSelectImage={onSelectImage}
                handleTabChange={handleTabChange}
                setSelectedFile={setSelectedFile}
                selectedFile={selectedFile}
              />
            )}
            {selectedTab === "link" && (
              <div styleName="post-creator__input-container">
                <input
                  styleName="post-creator__input post-creator__input_type_input"
                  placeholder="Link"
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                  pattern="/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;"
                  required
                ></input>
              </div>
            )}
          </div>
          <div styleName="post-creator__post-buttons">
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
  handleNotFoundStyleName: "ignore",
});
