import s from "./Header.module.css";
import subredditLogo from "../../../assets/subreddit-logo.svg";

const Header: React.FC = () => {
  return (
    <div className={s["header"]}>
      <div className={s["header__background"]}></div>
      <div className={s["header__container"]}>
        <div className={s["header__content"]}>
          <img
            className={s["header__subreddit-picture"]}
            src={subredditLogo}
            alt="default subreddit logo"
          />
          <div className={s["header__title-container"]}>
            <div className={s["header__title"]}>
              <h1 className={s["header__subreddit-name"]}>onepieee</h1>
              <h2 className={s["header__subreddit-link"]}>r/onepieee</h2>
            </div>
            <div className={s["header__buttons"]}>
              <button className={s["header__button"]}>Join</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
