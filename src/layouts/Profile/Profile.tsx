import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import s from "./Profile.module.css";
const Profile: React.FC = () => {
  return (
    <div className={s["profile"]}>
      <button className={s["profile__button"]}>
        <FaRegUser className={s["profile__button-icon"]} />
        <IoIosArrowDown className={s["profile__button-icon"]} />
      </button>
    </div>
  );
};

export default Profile;
