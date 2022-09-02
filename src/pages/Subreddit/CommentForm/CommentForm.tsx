import React, { useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./CommentForm.module.css";

interface Props {
  autoFocus: boolean;
  onReply: (content: string) => void;
}

const CommentForm: React.FC<Props> = ({ autoFocus, onReply }) => {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onReply(message);
    setMessage("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div styleName="comment-form-row">
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          styleName="message-input"
        />
        <button styleName="btn">Post</button>
      </div>
    </form>
  );
};

export default CSSModules(CommentForm, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
