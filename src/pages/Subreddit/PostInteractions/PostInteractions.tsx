import CSSModules from "react-css-modules";
import { BiMessage } from "react-icons/bi";
import styles from "./PostInteractions.module.css";
import { IoMdShareAlt } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import React from "react";

interface Props {
  commentsQuantity: number;
}

const PostInteractions: React.FC<Props> = ({ commentsQuantity }) => {
  return (
    <div styleName="post-excerpt__interactions">
      <div styleName="post-excerpt__interaction">
        <BiMessage styleName="post-excerpt__icon" />
        <span styleName="post-excerpt__action">
          {commentsQuantity} Comments
        </span>
      </div>
      <div styleName="post-excerpt__interaction">
        <IoMdShareAlt styleName="post-excerpt__icon" />
        <span styleName="post-excerpt__action">Share</span>
      </div>
      <div styleName="post-excerpt__interaction">
        <FaRegBookmark styleName="post-excerpt__icon" />
        <span styleName="post-excerpt__action">Save</span>
      </div>
      {/* <div styleName="post-excerpt__interaction">
        <span>Icon</span>
        <span styleName="post-excerpt__action">Hide</span>
      </div> */}
      {/* <div styleName="post-excerpt__interaction">
        <span>Icon</span>
        <span styleName="post-excerpt__action">Report</span>
      </div> */}
      {/* {conditional rendering for live chat} */}
    </div>
  );
};

export default CSSModules(PostInteractions, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
