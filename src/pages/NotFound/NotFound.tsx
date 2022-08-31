import CSSModules from "react-css-modules";
import styles from "./NotFound.module.css";
const NotFound: React.FC = () => {

  return (
    <div styleName="not-found">
      <img
        src="https://www.redditstatic.com/reddit404d.png"
        styleName="not-found__image"
        alt="redditor who is lost"
      />
      <h1 styleName="not-found__title">page not found</h1>
      <p styleName="not-found__description">the page you requested does not exist</p>
    </div>
  );
};

export default CSSModules(NotFound, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
