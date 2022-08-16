import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import logoName from "../../assets/white-logo-name.svg";
import classNames from "classnames";
import { getUser, signIn, signOutUser } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectAuthStatus } from "../../features/auth/authSlice";
import { RiSearchLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Profile from "../Profile/Profile";
import CSSModules from "react-css-modules";
import { AiFillHome } from "react-icons/ai";
import Dropdown from "../Dropdown/Dropdown";

const Navbar: React.FC = () => {
  const isLoggedIn = useAppSelector(selectAuthStatus);

  const [isSubscriptionsDropdownOpen, setIsSubscriptionsDropdownOpen] =
    useState(false);

  function handleHomeDropdown() {
    setIsSubscriptionsDropdownOpen((prevValue) => !prevValue);
  }

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
          <div styleName="header__dropdown-container">
            <div styleName="header__dropdown" onClick={handleHomeDropdown}>
              <div styleName="header__dropdown-left">
                <AiFillHome styleName="header__dropdown-icon" />
                <h1 styleName="header__dropdown-title">Home</h1>
              </div>
              <div styleName="header__dropdown-right">
                <IoIosArrowDown styleName="header__dropdown-icon" />
              </div>
            </div>
            <div className="header__dropdown-menu">
              {isSubscriptionsDropdownOpen && <Dropdown />}
            </div>
          </div>
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
            {isLoggedIn === false && (
              <button
                onClick={() => {
                  signOutUser();
                }}
                styleName="header__button header__button_type_sign-up"
              >
                Sign Up
              </button>
            )}
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
