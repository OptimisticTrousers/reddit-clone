import React, { useState } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import styles from "./SignUpModal.module.css";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const SignUpModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleEmail(event: InputEvent) {
    setEmail(event.target.value);
  }

  function handleUserName(event: InputEvent) {
    setUserName(event.target.value);
  }

  function handlePassword(event: InputEvent) {
    setPassword(event.target.value);
  }

  function handleConfirmPassword(event: InputEvent) {
    setConfirmPassword(event.target.value);
  }

  return (
    <Modal>
      <div styleName="sign-up-modal">
        <div styleName="sign-up-modal__container">
          <div styleName="sign-up-modal__image"></div>
          <div styleName="sign-up-modal__content">
            <form styleName="sign-up-modal__form">
              <h1 styleName="sign-up-modal__title">Sign up</h1>
              <p styleName="sign-up-modal__description">
                By continuing, you are setting up a Reddit account and agree to
                our{" "}
                <a
                  styleName="sign-up-modal__link"
                  href="https://www.redditinc.com/policies/user-agreement"
                >
                  User Agreement
                </a>{" "}
                and{" "}
                <a
                  styleName="sign-up-modal__link"
                  href="https://www.reddit.com/policies/privacy-policy"
                >
                  Privacy Policy
                </a>
                .
              </p>
              <input
                styleName="sign-up-modal__input"
                placeholder="EMAIL"
                value={email}
                onChange={handleEmail}
                required
              />
              <input
                styleName="sign-up-modal__input"
                placeholder="USERNAME"
                value={username}
                onChange={handleUserName}
                required
              />
              <input
                styleName="sign-up-modal__input"
                placeholder="PASSWORD"
                value={password}
                onChange={handlePassword}
                required
              />
              <input
                styleName="sign-up-modal__input"
                placeholder="CONFIRM PASSWORD"
                required
                onChange={handleConfirmPassword}
                value={confirmPassword}
              />
              <button styleName="sign-up-modal__button" type="submit">
                Continue
              </button>
              <div styleName="sign-up-modal__bottom-text-container">
                Already a redditor?
                <a styleName="sign-up-modal__bottom-text">LOG IN</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CSSModules(SignUpModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
