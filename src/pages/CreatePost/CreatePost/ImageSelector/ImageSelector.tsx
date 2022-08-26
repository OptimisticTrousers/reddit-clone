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
  const selectedFileRef = useRef<HTMLInputElement | null>(null);
  return (
    <div styleName="image-selector__upload">
      {selectedFile ? (
        <div styleName="image-selector__file-selector">
          <img styleName="image-selector__file-image" src={selectedFile} />
          <div styleName="image-selector__buttons">
            <button
              styleName="image-selector__button"
              onClick={() => handleTabChange("post")}
            >
              Back To Post
            </button>
            <button
              styleName="image-selector__button"
              onClick={() => setSelectedFile("")}
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
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload
          </button>
          <input
            type="file"
            ref={selectedFileRef}
            hidden
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
