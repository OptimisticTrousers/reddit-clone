import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./Profile.module.css";
import onlineStatus from "../../assets/online-status.svg";
import { getUserName } from "../../firebase";
import CSSModules from "react-css-modules";
import Dropdown from "../Dropdown/Dropdown";

interface Props {
  isLoggedIn: boolean;
}

const Profile: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <div styleName="profile">
      <button styleName="profile__button">
        {isLoggedIn ? (
          <span styleName="profile__details">
            <img
              src="https://styles.redditmedia.com/t5_g2km0/styles/profileIcon_snood9e1c00c-b1c6-46a9-a231-a6fcd78cdd16-headshot.png?width=256&height=256&frame=1&crop=256:256,smart&s=7bd48be150588ab7dc3dc5c73be4d0dcddeeae8d"
              alt="default reddit avatar"
              styleName="profile__avatar"
            />
            <div styleName="profile__content">
              <p styleName="profile__username">{getUserName()}</p>
              <p styleName="profile__karma">130 Karma</p>
            </div>
          </span>
        ) : (
          <FaRegUser styleName="profile__button-icon" />
        )}
        <IoIosArrowDown styleName="profile__button-icon" />
      </button>
    </div>
  );
};

export default CSSModules(Profile, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
