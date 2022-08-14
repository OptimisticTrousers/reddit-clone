import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import s from "./Profile.module.css";
import onlineStatus from "../../assets/online-status.svg";
import { getUserName } from "../../firebase";

interface Props {
  isLoggedIn: boolean;
}

const Profile: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <div className={s["profile"]}>
      <button className={s["profile__button"]}>
        {isLoggedIn ? (
          <span className={s["profile__details"]}>
            <img
              src="https://styles.redditmedia.com/t5_g2km0/styles/profileIcon_snood9e1c00c-b1c6-46a9-a231-a6fcd78cdd16-headshot.png?width=256&height=256&frame=1&crop=256:256,smart&s=7bd48be150588ab7dc3dc5c73be4d0dcddeeae8d"
              alt="default reddit avatar"
              className={s["profile__avatar"]}
            />
            <div className={s["profile__content"]}>
              <p className={s["profile__username"]}>{getUserName()}</p>
              <p className={s["profile__karma"]}>130 Karma</p>
            </div>
          </span>
        ) : (
          <FaRegUser className={s["profile__button-icon"]} />
        )}
        <IoIosArrowDown className={s["profile__button-icon"]} />
      </button>
    </div>
  );
};

export default Profile;
