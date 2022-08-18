import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./layouts/Navbar/Navbar";
import { useAppSelector } from "./hooks/hooks";
import CSSModules from "react-css-modules";
import styles from "./App.module.css";
import { selectCommunityModalState } from "./features/subreddit/subredditSlice";
import CommunityModal from "./components/CommunityModal/CommunityModal";
import { selectSignUpModalState } from "./features/auth/authSlice";
import SignUpModal from "./components/SignUpModal/SignUpModal";

const App: React.FC = () => {
  const communityModalState = useAppSelector(selectCommunityModalState);

  const signUpModalState = useAppSelector(selectSignUpModalState);

  return (
    <>
      {communityModalState && <CommunityModal />}
      {signUpModalState && <SignUpModal />}
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
