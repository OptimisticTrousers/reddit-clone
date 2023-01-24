/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import logoName from "../../assets/white-logo-name.svg";
import classNames from "classnames";
import { getUser, signIn, signOutUser } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  selectAuthStatus,
  toggleSignInModal,
  toggleSignUpModal,
} from "../../features/auth/authSlice";
import { RiSearchLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Profile from "../Profile/Profile";
import CSSModules from "react-css-modules";
import { AiFillHome } from "react-icons/ai";
import Dropdown from "../Dropdown/Dropdown";
import CommunityDropdown from "../CommunityDropdown/CommunityDropdown";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import { selectCommunityData } from "../../features/subreddit/subredditSlice";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

type FormEvent = React.FormEvent<HTMLFormElement>;

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name } = useAppSelector(selectCommunityData);
  const isLoggedIn = useAppSelector(selectAuthStatus);

  const params = useParams();

  const [isSubscriptionsDropdownOpen, setIsSubscriptionsDropdownOpen] =
    useState(false);

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  function handleSearchInput(event: InputEvent) {
    setSearchInput(event.target.value);
  }

  function submitSearch(event: FormEvent) {
    setTimeout(() => {
      navigate(`${searchInput}`);
      setSearchInput("");
      location.reload();
    }, 500);
  }

  function handleProfileDropdown() {
    setIsProfileDropdownOpen((prevValue) => !prevValue);
  }

  function handleHomeDropdown() {
    setIsSubscriptionsDropdownOpen((prevValue) => !prevValue);
  }

  function handleSignUpClick() {
    dispatch(toggleSignUpModal());
  }

  function handleSignInClick() {
    dispatch(toggleSignInModal());
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
          {isLoggedIn && (
            <div styleName="header__dropdown-container">
              <div styleName="header__dropdown" onClick={handleHomeDropdown}>
                <div styleName="header__dropdown-left">
                  <AiFillHome styleName="header__dropdown-icon" />
                  <h1 styleName="header__dropdown-title">
                    {Object.keys(params).length === 0 ? "Home" : name}
                  </h1>
                </div>
                <div styleName="header__dropdown-right">
                  <IoIosArrowDown styleName="header__dropdown-icon" />
                </div>
              </div>
              <div className="header__dropdown-menu">
                {isSubscriptionsDropdownOpen && (
                  <CommunityDropdown
                    dropdown={"community"}
                    handleHomeDropdown={handleHomeDropdown}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <div styleName="header__container">
          <div styleName="header__search-icon-container">
            <RiSearchLine styleName="header__search-icon" />
          </div>
          <form onSubmit={submitSearch} styleName="header__search-form">
            <input
              styleName="header__search-input"
              placeholder="Search Reddit ie. (r/dogs)"
              onChange={handleSearchInput}
              value={searchInput}
              pattern="(?:^| )(/?r/[a-z]+)"
              title={`${searchInput} is not valid. Please enter a 'r/', followed by a subreddit name in the format 'r/dogs'`}
            />
          </form>
        </div>
        <div styleName="header__right">
          <div styleName="header__buttons">
            {isLoggedIn === false && (
              <>
                <button
                  onClick={handleSignInClick}
                  styleName="header__button header__button_type_log-in"
                >
                  Log In
                </button>
                <button
                  onClick={handleSignUpClick}
                  styleName="header__button header__button_type_sign-up"
                >
                  Sign Up
                </button>
              </>
            )}
            <div className="header__dropdown-menu">
              <div
                styleName="header__dropdown-profile"
                onClick={handleProfileDropdown}
              >
                <Profile isLoggedIn={isLoggedIn} />
              </div>
              <div styleName="header__dropdown-dropdown">
                {isProfileDropdownOpen && isLoggedIn && (
                  <ProfileDropdown dropdown={"dropdown"} />
                )}
              </div>
            </div>
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
