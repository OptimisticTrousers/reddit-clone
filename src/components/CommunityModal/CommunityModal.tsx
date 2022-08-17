import CSSModules from "react-css-modules";
import Modal from "../Modal/Modal";
import styles from "./CommunityModal.module.css";
import informationIcon from "../../assets/information-icon.svg";
import selectedRadio from "../../assets/selected-radio.svg";
import personIcon from "../../assets/person-icon.svg";
import eyeIcon from "../../assets/eye-icon.svg";
import lockIcon from "../../assets/lock-icon.svg";
import exitIcon from "../../assets/exit-icon.svg";
import { useAppDispatch } from "../../hooks/hooks";
import { toggleCommunityModalState } from "../../features/subreddit/subredditSlice";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db, getUserName } from "../../firebase";
import { nanoid } from "nanoid";
import React, { useState } from "react";
type InputEvent = React.ChangeEvent<HTMLInputElement>;

const CommunityModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const [subredditName, setSubredditName] = useState("");

  const [communityType, setCommunityType] = useState("");

  function handleSubredditName(event: InputEvent) {
    setSubredditName(event.target.value);
  }

  function onToggleModalClick() {
    dispatch(toggleCommunityModalState());
  }

  async function createSubreddit() {
    const subredditsRef = collection(db, "subreddits");
    console.log(subredditName);
    console.log(communityType);

    // await addDoc(subredditsRef, {
    //   created_at: serverTimestamp(),
    //   creator_at: getUserName(),
    //   description: "Add a description",
    //   id: nanoid(),
    //   name: subredditName,
    //   number_of_members: 1,
    //   privacy_type: communityType,
    // });
  }

  function handleRadio(event: any) {
    event.preventDefault();
    console.log(event.target.value);
    setCommunityType(event.target.value);
  }

  return (
    <Modal>
      <div styleName="community-modal">
        <div styleName="community-modal__container" onChange={handleRadio}>
          <div styleName="community-modal__header">
            <h1 styleName="community-modal__title">Create a community</h1>
            <img
              styleName="community-modal__icon community-modal__icon_type_exit"
              src={exitIcon}
              alt="exit button icon"
              onClick={onToggleModalClick}
            />
          </div>
          {/* <div styleName="community-modal__container"> */}
          <div styleName="community-modal__instructions">
            <h3 styleName="community-modal__name">Name</h3>
            <div styleName="community-modal__description-container">
              <p styleName="community-modal__instruction">
                Community names including capitalization cannot be changed
                <img
                  styleName="community-modal__icon"
                  src={informationIcon}
                  alt="information icon"
                />
              </p>
            </div>
          </div>
          <form onSubmit={createSubreddit}>
            <div styleName="community-modal__form">
              <input
                maxLength={21}
                type="text"
                styleName="community-modal__input"
                placeholder="r/gaming"
                value={subredditName}
                onChange={handleSubredditName}
                required
              />
              <div styleName="community-modal__feedback">
                <p styleName="community-modal__characters-remaining">
                  21 Characters remaining
                </p>
                {/* <p styleName="community-modal__feedback-message">
                A community name is required
              </pr */}
              </div>
            </div>
            <div styleName="community-modal__radio">
              <h3 styleName="community-modal__community-type-title">
                Community type
              </h3>
              <div styleName="community-modal__radio-group">
                <input type="radio" value="public" name="community_type" required/>
                {/* <img
                styleName="community-modal__icon"
                src={selectedRadio}
                alt="user selected radio button"
              /> */}
                <img
                  styleName="community-modal__icon"
                  src={personIcon}
                  alt="icon of a faceless person at shoulder level"
                />
                <p styleName="community-modal__community-type">Public</p>
                <p styleName="community-modal__community-type-description">
                  Anyone can view, post, and comment to this community
                </p>
              </div>
            </div>
            <div styleName="community-modal__radio">
              <div styleName="community-modal__radio-group">
                <input type="radio" value="restricted" name="community_type" required/>
                {/* <img
                styleName="community-modal__icon"
                src={selectedRadio}
                alt="user selected radio button"
              /> */}
                <img
                  styleName="community-modal__icon"
                  src={personIcon}
                  alt="icon of a faceless person at shoulder level"
                />
                <p styleName="community-modal__community-type">Restricted</p>
                <p styleName="community-modal__community-type-description">
                  Anyone can view this community, but only approved users can
                  post
                </p>
              </div>
            </div>
            <div styleName="community-modal__radio">
              <div styleName="community-modal__radio-group">
                <input
                  type="radio"
                  value="private"
                  name="community_type"
                  required
                />
                {/* <img
                styleName="community-modal__icon"
                src={selectedRadio}
                alt="user selected radio button"
              /> */}
                <img
                  styleName="community-modal__icon"
                  src={personIcon}
                  alt="icon of a faceless person at shoulder level"
                />
                <p styleName="community-modal__community-type">Private</p>
                <p styleName="community-modal__community-type-description">
                  Only approved users can view and submit to this community
                </p>
              </div>
            </div>
            <div styleName="community-modal__buttons">
              <button
                styleName="community-modal__button community-modal__button_type_cancel"
                onClick={onToggleModalClick}
              >
                Cancel
              </button>
              <button
                styleName="community-modal__button community-modal__button_type_create"
                type="submit"
              >
                Create Community
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CSSModules(CommunityModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
