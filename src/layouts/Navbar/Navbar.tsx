import React from "react";
import { ReactPropTypes } from "react";
import { JsxEmit } from "typescript";
import styled from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import logoName from "../../assets/logo-name.svg";

const Navbar: React.FC = () => {
  return (
    <header className={styled['header']}>
      <div className={styled['header__content']}>
        <Link to="/" className={styled['header__link']}>
          <img className={styled['header__logo']} src={logo} alt="reddit logo" />
          <img
            className={styled['header__logo-name']}
            src={logoName}
            alt="the name reddit"
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
