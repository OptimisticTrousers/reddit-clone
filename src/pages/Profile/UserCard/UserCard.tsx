import React from "react";
import CSSModules from "react-css-modules";
import styles from "./UserCard.module.css";
import { TbCake } from "react-icons/tb";
import Card from "../../../components/Card/Card";
import { getUser, getUserName } from "../../../firebase";
import moment from "moment";

const UserCard: React.FC = () => {
  return (
    <Card>
      <div styleName="user-card">
        <div styleName="user-card__header"></div>
        <div styleName="user-card__avatar">
          <img
            styleName="user-card__image"
            src="https://i.redd.it/snoovatar/avatars/d9e1c00c-b1c6-46a9-a231-a6fcd78cdd16.png"
            alt="default avatar profile"
          />
        </div>
        <h1 styleName="user-card__title">{getUserName()}</h1>
        <span styleName="user-card__text">
          u/{getUserName()} ·{" "}
          {moment(new Date(getUser()?.metadata.creationTime!)).fromNow()}
        </span>
        <div styleName="user-card__details">
          <h5 styleName="user-card__detail-title">Cake day</h5>
          <div styleName="user-card__cake-day">
            <TbCake styleName="user-card__icon" />
            <h5 styleName="user-card__detail-title">
              {getUser()?.metadata.creationTime!}.
            </h5>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CSSModules(UserCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
