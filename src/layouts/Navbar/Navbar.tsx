import React from "react";
import { ReactPropTypes } from "react";
import { JsxEmit } from "typescript";
import s from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import logoName from "../../assets/logo-name.svg";

const Navbar: React.FC = () => {
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
          <input
            className={s["header__search-form"]}
            placeholder="Search Reddit"
          />
        </div>
      </div>
      <div className={s["header__right"]}>
        <div className={s["header__buttons"]}>
          <button className={s["header__button header__button_type_log-in"]}>
            Log In
          </button>
          <button className={s["header__button header__button_type_sign-up"]}>
            Sign Up
          </button>
        </div>
        <div className={s["header__profile"]}>
          <button className={s["header__dropdown"]}></button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
