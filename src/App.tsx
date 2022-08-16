import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./layouts/Navbar/Navbar";
import { useAppSelector } from "./hooks/hooks";
import CSSModules from "react-css-modules";
import styles from "./App.module.css";
import { selectCommunityModalState } from "./features/subreddit/subredditSlice";
import CommunityModal from "./components/CommunityModal/CommunityModal";

const App: React.FC = () => {
  const communityModalState = useAppSelector(selectCommunityModalState);

  return (
    <>
      {communityModalState && <CommunityModal />}
      <Navbar />
      <div styleName="container">
        <Outlet />
      </div>
    </>
  );
};

export default CSSModules(App, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
