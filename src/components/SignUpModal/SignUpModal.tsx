import React from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import styles from "./SignUpModal.module.css";

const SignUpModal: React.FC = () => {
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
                <a styleName="sign-up-modal__link" href="https://www.redditinc.com/policies/user-agreement">
                  User Agreement
                </a>{" "}
                and{" "}
                <a styleName="sign-up-modal__link" href="https://www.reddit.com/policies/privacy-policy">
                  Privacy Policy
                </a>
                .
              </p>
              <input styleName="sign-up-modal__input" placeholder="EMAIL" />
              <input styleName="sign-up-modal__input" placeholder="USERNAME" />
              <input styleName="sign-up-modal__input" placeholder="PASSWORD" />
              <input
                styleName="sign-up-modal__input"
                placeholder="CONFIRM PASSWORD"
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
