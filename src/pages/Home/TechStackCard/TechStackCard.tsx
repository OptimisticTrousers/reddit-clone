import CSSModules from "react-css-modules";
import Card from "../../../components/Card/Card";
import styles from "./TechStackCard.module.css";

const TechStackCard: React.FC = () => {
  return (
    <Card>
      <div styleName="tech-stack">
        <div styleName="techs">
          <a
            href="https://reactjs.org/"
            styleName="tech"
            target="_blank"
            rel="noreferrer"
          >
            React.js
          </a>
          <a
            href="https://firebase.google.com/"
            styleName="tech"
            target="_blank"
            rel="noreferrer"
          >
            Firebase
          </a>
          <a
            href="https://reactrouter.com/en/main"
            styleName="tech"
            target="_blank"
            rel="noreferrer"
          >
            React Router
          </a>
          <a
            href="https://redux.js.org/"
            styleName="tech"
            target="_blank"
            rel="noreferrer"
          >
            Redux
          </a>
          <a
            href="https://www.typescriptlang.org/"
            styleName="tech"
            target="_blank"
            rel="noreferrer"
          >
            Typescript
          </a>
          <a
            href="https://github.com/gajus/react-css-modules"
            styleName="tech"
            target="_blank"
            rel="noreferrer"
          >
            React CSS Modules
          </a>
          <a
            href="https://www.npmjs.com/package/nanoid"
            styleName="tech"
            target="_blank"
            rel="noreferrer"
          >
            nanoid
          </a>
          <a
            href="https://momentjs.com/"
            styleName="tech"
            target="_blank"
            rel="noreferrer"
          >
            moment.js
          </a>
          <a
            href="https://github.com/danilowoz/react-content-loader"
            styleName="tech"
            target="_blank"
            rel="noreferrer"
          >
            React-ContentLoader
          </a>
        </div>
        <p styleName="copyright">Tony Isern © 2021. All rights reserved</p>
      </div>
    </Card>
  );
};

export default CSSModules(TechStackCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
