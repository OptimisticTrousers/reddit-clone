import React from "react";
import s from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import logoName from "../../assets/white-logo-name.svg";
import classNames from "classnames";
import { useAppDispatch } from "../../hooks/hooks";
import { modalReducer } from "../../redux/store";


const Navbar: React.FC = () => {

  const dispatch = useAppDispatch();

  return (
    <header className={s["header"]}>
      <div className={s["header__content"]}>
        <div className={s["header__left"]}>
          <Link to="/" className={s["header__link"]}>
            <img className={s["header__logo"]} src={logo} alt="reddit logo" />
            <img
              className={s["header__logo-name"]}
              src={logoName}
              alt="the name reddit"
            />
          </Link>

          <div className={s["header__container"]}>
            <form className={s["header__search-form"]}>
              <input className={s["header__search-input"]} placeholder="Search Reddit"/>
            </form>
          </div>
        </div>
        <div className={s["header__right"]}>
          <div className={s["header__buttons"]}>
            <button
              onClick={() => {
              }}
              className={classNames(
                s["header__button"],
                s["header__button_type_log-in"]
              )}
            >
              Log In
            </button>
            <button
              className={classNames(
                s["header__button"],
                s["header__button_type_sign-up"]
              )}
            >
              Sign Up
            </button>
          </div>
          <div className={s["header__profile"]}>
            <button className={s["header__dropdown"]}>Profile</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
