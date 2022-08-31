/* eslint-disable jsx-a11y/img-redundant-alt */
import CSSModules from "react-css-modules";
import Card from "../Card/Card";
import styles from "./PostCreatorCard.module.css";
import { AiOutlinePicture } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { selectCommunityData } from "../../features/subreddit/subredditSlice";
import { selectAuthStatus } from "../../features/auth/authSlice";

const PostCreatorCard: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isLoggedIn = useAppSelector(selectAuthStatus);
  const { name } = useAppSelector(selectCommunityData);

  const navigate = useNavigate();

  function inputFocus() {
    navigate(`/r/${name}/submit`);
  }

  function navigateToUser() {
    navigate("/user");
  }

  function navigateToCreatePostPage() {
    navigate(`/r/${name}/submit`);
  }
  return (
    <>
      {isLoggedIn && (
        <Card>
          <div styleName="post-creator-card">
            <div
              styleName="post-creator-card__picture"
              onClick={navigateToUser}
              data-testid="profile-picture"
            >
              <img
                styleName="post-creator-card__profile-icon"
                src="https://styles.redditmedia.com/t5_g2km0/styles/profileIcon_snood9e1c00c-b1c6-46a9-a231-a6fcd78cdd16-headshot.png?width=256&height=256&frame=1&crop=256:256,smart&s=7bd48be150588ab7dc3dc5c73be4d0dcddeeae8d"
                alt="default reddit profile"
              />
            </div>
            <input
              ref={inputRef}
              styleName="post-creator-card__input"
              placeholder="Create Post"
              onFocus={inputFocus}
            />
            <button
              styleName="post-creator-card__icon-link"
              onClick={navigateToCreatePostPage}
              title="navigate to CreatePostPage"
              data-testid="picture-button"
            >
              <AiOutlinePicture styleName="post-creator-card__icon" />
            </button>
            <button
              styleName="post-creator-card__icon-link"
              onClick={navigateToCreatePostPage}
              data-testid="link-button"
            >
              <BsLink45Deg styleName="post-creator-card__icon" />
            </button>
          </div>
        </Card>
      )}
    </>
  );
};

export default CSSModules(PostCreatorCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
