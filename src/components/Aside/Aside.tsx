import React from "react";
import CSSModules from "react-css-modules";
import styles from "./Aside.module.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Aside: React.FC<Props> = ({ children }) => {
  return <aside>{children}</aside>;
};

export default CSSModules(Aside, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
