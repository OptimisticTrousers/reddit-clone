import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./layouts/Navbar/Navbar";
import { useAppSelector } from "./hooks/hooks";
import CSSModules from "react-css-modules";
import styles from "./App.module.css";
import { selectCommunityModalState } from "./features/subreddit/subredditSlice";
import CommunityModal from "./components/CommunityModal/CommunityModal";
import {
  selectSignInModalState,
  selectSignUpModalState,
} from "./features/auth/authSlice";
import AuthModal from "./components/AuthModal/AuthModal";

const App: React.FC = () => {
  const communityModalState = useAppSelector(selectCommunityModalState);

  const signUpModalState = useAppSelector(selectSignUpModalState);

  const signInModalState = useAppSelector(selectSignInModalState);

  return (
    <>
      {communityModalState && <CommunityModal />}
      {signUpModalState && <AuthModal />}
      {signInModalState && <AuthModal />}
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
