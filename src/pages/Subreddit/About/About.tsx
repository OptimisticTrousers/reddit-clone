import s from "./About.module.css";

const About: React.FC = () => {
  return (
    <div className={s["about"]}>
      <div className={s["about__top"]}>
        <h2 className={s["about__title"]}>About Community</h2>
      </div>
      <p className={s["about__description"]}>
        Make r/onepiece into r/onepiee in r/place
      </p>
      <div className={s["about__members"]}>
        <div className={s["about__block"]}>
          <div className={s["about__number"]}>3</div>
          <div className={s["about__member"]}>Members</div>
        </div>
        <div className={s["about__block"]}>
          <div className={s["about__number"]}>4</div>
          <div className={s["about__member"]}>Online</div>
        </div>
      </div>
      <hr className={s["about__thematic-break"]}></hr>
      <div className={s["about__cakeday"]}>
        <span className={s["about__icon"]}></span>
        <p className={s["about__date"]}>Created Apr 4, 2022</p>
      </div>
      <button className={s["about__button about__button_type_create"]}>Create Post</button>
      <button className={s["about__button about__button_type_options"]}>Community Options</button>
    </div>
  );
};

export default About;
