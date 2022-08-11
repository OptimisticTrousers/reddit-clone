import s from "./Header.module.css";
import subredditLogo from "../../../assets/subreddit-logo.svg";

const Header: React.FC = () => {
  return (
    <div className={s["header"]}>
      <div className={s["header__container"]}>
        <span>Background Image</span>
      </div>
      <div className={s["header__container"]}>
        <div className={s["header__content"]}>
          <img src={subredditLogo} alt="default subreddit logo" />
          <div className={s["header__title"]}>
            <h1>onepieee</h1>
            <h2>r/onepieee</h2>
          </div>
          <button className={s["header__button"]}>Join</button>
        </div>
      </div>
    </div>
  );
};
