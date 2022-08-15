import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import logoName from "../../assets/white-logo-name.svg";
import classNames from "classnames";
import { getUser, signIn, signOutUser } from "../../firebase";
import { useAppSelector } from "../../hooks/hooks";
import { selectAuthStatus } from "../../features/auth/authSlice";
import { RiSearchLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Profile from "../Profile/Profile";
import CSSModules from "react-css-modules";

const Navbar: React.FC = () => {
  const isLoggedIn = useAppSelector(selectAuthStatus);

  return (
    <header styleName="header">
      <div styleName="header__content">
        <div styleName="header__left">
          <Link to="/" styleName="header__links">
            <img styleName="header__logo" src={logo} alt="reddit logo" />
            <img
              styleName="header__logo-name"
              src={logoName}
              alt="the name reddit"
            />
          </Link>
        </div>
        <div styleName="header__container">
          <div styleName="header__search-icon-container">
            <RiSearchLine styleName="header__search-icon" />
          </div>
          <input styleName="header__search-input" placeholder="Search Reddit" />
        </div>
        <div styleName="header__right">
          <div styleName="header__buttons">
            {/* {isLoggedIn ? (
              <h2>User is logged in</h2>
            ) : ( */}
            <button
              onClick={() => {
                signIn();
              }}
              styleName="header__button header__button_type_log-in"
            >
              Log In
            </button>
            {/* )} */}
            <button
              onClick={() => {
                signOutUser();
              }}
              styleName="header__button header__button_type_sign-up"
            >
              {isLoggedIn ? "Sign Out" : " Sign Up"}
            </button>
            <Profile isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default CSSModules(Navbar, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
