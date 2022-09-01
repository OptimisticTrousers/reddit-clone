import React, { useRef } from "react";
import CSSModules from "react-css-modules";
import styles from "./ImageSelector.module.css";

interface Props {
  selectedFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTabChange: (value: string) => void;
  setSelectedFile: (value: string) => void;
}

const ImageSelector: React.FC<Props> = ({
  selectedFile,
  handleTabChange,
  setSelectedFile,
  onSelectImage,
}) => {

  function uploadImage() {
    selectedFileRef.current?.click()
  }
  const selectedFileRef = useRef<HTMLInputElement | null>(null);
  return (
    <div styleName="image-selector__upload">
      {selectedFile ? (
        <div styleName="image-selector__file-selector">
          <img styleName="image-selector__file-image" src={selectedFile} alt="user generated"/>
          <div styleName="image-selector__buttons">
            <button
              styleName="image-selector__button"
              onClick={() => handleTabChange("post")}
              data-testid="back-to-post-button"
            >
              Back To Post
            </button>
            <button
              styleName="image-selector__button"
              onClick={() => setSelectedFile("")}
              data-testid="remove-button"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div styleName="image-selector__buttons">
          <button
            type="button"
            styleName="image-selector__button"
            onClick={uploadImage}
          >
            Upload
          </button>
          <input
            type="file"
            ref={selectedFileRef}
            hidden
            data-testid="file-input"
            onChange={onSelectImage}
          />
        </div>
      )}
    </div>
  );
};

export default CSSModules(ImageSelector, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
