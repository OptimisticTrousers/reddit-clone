import React, { useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./CommentForm.module.css";

interface Props {
  autoFocus: boolean;
  onReply: (content: string) => void;
  setIsReplying: (value: boolean) => void;
}

const CommentForm: React.FC<Props> = ({
  autoFocus,
  onReply,
  setIsReplying,
}) => {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onReply(message);
    setIsReplying(false);
    setMessage("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div styleName="comment-form-row">
        <textarea
          required
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
  handleNotFoundStyleName: "ignore",
});
