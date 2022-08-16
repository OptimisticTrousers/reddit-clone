import CSSModules from "react-css-modules";
import Modal from "../Modal/Modal";
import styles from "./CommunityModal.module.css";
import informationIcon from "../../assets/information-icon.svg";
import selectedRadio from "../../assets/selected-radio.svg";
import personIcon from "../../assets/person-icon.svg";
import eyeIcon from "../../assets/eye-icon.svg";
import lockIcon from "../../assets/lock-icon.svg";
import exitIcon from "../../assets/exit-icon.svg";

const CommunityModal: React.FC = () => {
  return (
    <Modal>
      <div styleName="community-modal">
        <div styleName="community-modal__container">
          <div styleName="community-modal__header">
            <h1 styleName="community-modal__title">Create a community</h1>
            <img
              styleName="community-modal__icon"
              src={exitIcon}
              alt="exit button icon"
            />
          </div>
          {/* <div styleName="community-modal__container"> */}
          <div styleName="community-modal__instructions">
            <h3 styleName="community-modal__name">Name</h3>
            <div styleName="community-modal__description-container">
              <p styleName="community-modal__instruction">
                Community names including capitalization cannot be changed
                <img
                  styleName="community-modal__icon"
                  src={informationIcon}
                  alt="information icon"
                />
              </p>
            </div>
          </div>
          <div styleName="community-modal__form">
            <input
              maxLength={21}
              type="text"
              styleName="community-modal__input"
              placeholder="r/gaming"
            />
            <div styleName="community-modal__feedback">
              <p styleName="community-modal__characters-remaining">
                21 Characters remaining
              </p>
              {/* <p styleName="community-modal__feedback-message">
                A community name is required
              </pr */}
            </div>
          </div>
          <div styleName="community-modal__radio">
            <h3 styleName="community-modal__community-type-title">
              Community type
            </h3>
            <div styleName="community-modal__radio-group">
              <input type="hidden" value="public" />
              <img
                styleName="community-modal__icon"
                src={selectedRadio}
                alt="user selected radio button"
              />
              {/* <div stylename="community-modal__text">
                <div stylename="community-modal__icon-container"> */}
                  <img
                    styleName="community-modal__icon"
                    src={personIcon}
                    alt="icon of a faceless person at shoulder level"
                  />
                {/* </div> */}
                <p styleName="community-modal__community-type">Public</p>
                <p styleName="community-modal__community-type-description">
                  Anyone can view, post, and comment to this community
                  </p>
                {/* </div>
              </div> */}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </Modal>
  );
};

export default CSSModules(CommunityModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
