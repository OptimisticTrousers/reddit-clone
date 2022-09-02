import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import {
  selectSignInModalState,
  selectSignUpModalState,
  toggleSignInModal,
  toggleSignUpModal,
} from "../../features/auth/authSlice";
import { auth, getUser, getUserName, signIn } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Modal from "../Modal/Modal";
import styles from "./AuthModal.module.css";
import exitIcon from "../../assets/exit-icon.svg";
import googleIcon from "../../assets/google-logo.svg";
import { serverTimestamp } from "firebase/firestore";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

type FormEvent = React.FormEvent<HTMLFormElement>;

const AuthModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signInModalState = useAppSelector(selectSignInModalState);
  const signUpModalState = useAppSelector(selectSignUpModalState);

  const dispatch = useAppDispatch();

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

  function handleModalSwitch() {
    dispatch(toggleSignUpModal());
    dispatch(toggleSignInModal());
  }

  function handleModalExit() {
    if (signInModalState === true) {
      dispatch(toggleSignInModal());
    }
    if (signUpModalState === true) {
      dispatch(toggleSignUpModal());
    }
  }

  function onOAuthClick() {
    if (signUpModalState) {
      dispatch(toggleSignUpModal());
    } else if (signInModalState) {
      dispatch(toggleSignInModal());
    }
    signIn();
  }

  async function formSubmit(event: FormEvent) {
    event.preventDefault();

    if (signUpModalState) {
      if (password === confirmPassword) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          await updateProfile(userCredential.user, {
            displayName: username,
          });
          dispatch(toggleSignUpModal());
        } catch (error) {
          alert(`Sorry, this email has already been used: ${error}`);
        }
      } else {
        alert("Please check your passwords again!");
      }
    } else if (signInModalState) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(toggleSignInModal());
      } catch (error) {
        alert(`Wrong email or password. Please try again: ${error}`);
      }
    }
  }

  return (
    <Modal>
      <div styleName="sign-up-modal">
        <div styleName="sign-up-modal__container">
          <button
            styleName="sign-up-modal__exit"
            onClick={handleModalExit}
            data-testid="exit-button"
          >
            <img
              styleName="sign-up-modal__exit-icon"
              src={exitIcon}
              alt="exit button for modal"
            />
          </button>
          <div styleName="sign-up-modal__image"></div>
          <div styleName="sign-up-modal__content">
            <form styleName="sign-up-modal__form" onSubmit={formSubmit}>
              <h1 styleName="sign-up-modal__title">
                {(signInModalState && "Log In") ||
                  (signUpModalState && "Sign Up")}
              </h1>
              <p styleName="sign-up-modal__description">
                By continuing,{" "}
                {(signInModalState && "you") ||
                  (signUpModalState &&
                    "you are setting up a Reddit account and")}{" "}
                agree to our{" "}
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
              <button styleName="sign-up-modal__oauth" onClick={onOAuthClick}>
                <img
                  styleName="sign-up-modal__icon"
                  src={googleIcon}
                  alt="google icon"
                />
                <p styleName="sign-up-modal__oauth-text">
                  {" "}
                  Continue with Google
                </p>
              </button>
              <div styleName="sign-up-modal__divider">
                <span styleName="sign-up-modal__divider-line"></span>
                <span styleName="sign-up-modal__divider-text">OR</span>
                <span styleName="sign-up-modal__divider-line"></span>
              </div>
              <input
                type="email"
                styleName="sign-up-modal__input"
                placeholder="EMAIL"
                value={email}
                onChange={handleEmail}
                required
              />
              {signUpModalState && (
                <input
                  styleName="sign-up-modal__input"
                  placeholder="USERNAME"
                  value={username}
                  onChange={handleUserName}
                  required
                />
              )}
              <input
                styleName="sign-up-modal__input"
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={handlePassword}
                required
              />
              {signUpModalState && (
                <input
                  styleName="sign-up-modal__input"
                  type="password"
                  placeholder="CONFIRM PASSWORD"
                  required
                  onChange={handleConfirmPassword}
                  value={confirmPassword}
                />
              )}
              <button styleName="sign-up-modal__button" type="submit">
                Continue
              </button>
              <div styleName="sign-up-modal__bottom-text-container">
                {(signInModalState && "New to Reddit?") ||
                  (signUpModalState && " Already a redditor?")}
                <button
                  styleName="sign-up-modal__bottom-text"
                  onClick={handleModalSwitch}
                >
                  {(signInModalState && "SIGN UP") ||
                    (signUpModalState && "LOG IN")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CSSModules(AuthModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
