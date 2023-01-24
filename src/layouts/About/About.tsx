/* eslint-disable no-restricted-globals */
import CSSModules from "react-css-modules";
import { IoIosArrowDown, IoIosLogIn } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/CardHeader/CardHeader";
import {
  selectCommunityData,
  setCommunityData,
} from "../../features/subreddit/subredditSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./About.module.css";
import moment from "moment";
import { TbCake } from "react-icons/tb";
import Article from "../../components/Skeletons/Article";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, getUserId } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../../firebase/firebase-config";
import { FaReddit } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi";
import {
  selectAuthStatus,
  toggleSignInModal,
} from "../../features/auth/authSlice";

const About: React.FC = () => {
  const isLoggedIn = useAppSelector(selectAuthStatus);
  const communityData = useAppSelector(selectCommunityData);

  const [isUserModerator, setIsUserModerator] = useState(false);

  const [selectedFile, setSelectedFile] = useState<string>("");

  const [description, setDescription] = useState(communityData.description);

  const [toggleDescription, setToggleDescription] = useState(false);

  const { subredditName } = useParams();
  const dispatch = useAppDispatch();

  const selectedFileRef = useRef<HTMLInputElement>(null);

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  const onUpdateImage = async () => {
    if (!selectedFile) return;
    if (!isLoggedIn) {
      alert("Please sign in to upload an image!");
      dispatch(toggleSignInModal());
    }
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "subreddits", communityData.name), {
        imageURL: downloadURL,
      });

      dispatch(setCommunityData({ ...communityData, imageURL: downloadURL }));
    } catch (error) {
      console.log(`Failed to upload image. Please try again: ${error}`);
    }
  };

  const changeDescription = async () => {
    if (isLoggedIn) {
      try {
        const communityDocRef = doc(db, "subreddits", subredditName!);

        await updateDoc(communityDocRef, {
          description,
        });

        setToggleDescription((prevValue) => !prevValue);
      } catch (error) {
        console.log(
          `Failed to change subreddit description. Please try again: ${error}`
        );
      }
    } else {
      alert("Please sign in if you are the creator of this community");
      dispatch(toggleSignInModal());
    }
  };

  useEffect(() => {
    async function isUserModerator() {
      try {
        const communitySnippetsRef = doc(
          db,
          "users",
          `/${getUserId()}/communitySnippets/${communityData.name}`
        );

        const communitySnippetsDoc = await getDoc(communitySnippetsRef);
        console.log(communitySnippetsDoc?.data()?.isModerator)

        setIsUserModerator(communitySnippetsDoc?.data()?.isModerator);
      } catch (error) {
        console.log(`Could not see if the user is a moderator: ${error}`);
      }
    }

    isUserModerator();
  }, [communityData.name]);

  return (
    <Card>
      <CardHeader />
      {Object.keys(communityData).length !== 0 ? (
        <>
          {isUserModerator && isLoggedIn ? (
            <div styleName="about__admin-description">
              {toggleDescription === false && (
                <>
                  <div styleName="about__admin-description-text">
                    {communityData.description}
                  </div>
                  <HiOutlinePencil
                    styleName="about__admin-image"
                    onClick={() =>
                      setToggleDescription((prevValue) => !prevValue)
                    }
                  />
                </>
              )}
              {toggleDescription && (
                <>
                  <textarea
                    styleName="about__admin-input"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your community"
                    maxLength={500}
                    value={description}
                  >
                    {description}
                  </textarea>
                  <button styleName="about__admin-button">
                    <HiOutlinePencil onClick={changeDescription} />
                  </button>
                </>
              )}
            </div>
          ) : (
            <p styleName="about__description">{communityData.description}</p>
          )}
          <div styleName="about__members">
            <div styleName="about__block">
              <div styleName="about__number">
                {communityData.numberOfMembers?.toLocaleString()}
              </div>
              <div styleName="about__member">Members</div>
            </div>
            <div styleName="about__block">
              <div styleName="about__number">4</div>
              <div styleName="about__member">Online</div>
            </div>
          </div>
          <hr styleName="about__thematic-break"></hr>
          <div styleName="about__cakeday">
            <span styleName="about__icon"></span>
            <p styleName="about__date">
              <TbCake /> Created{" "}
              {moment(new Date(communityData.createdAt * 1000)).format(
                "MMM DD, YYYY"
              )}
            </p>
          </div>
          <Link to={`/r/${communityData.name}/submit`}>
            <button styleName="about__button about__button_type_create">
              Create Post
            </button>
          </Link>
          <hr styleName="about__thematic-break"></hr>

          {isUserModerator && (
            <div styleName="about__admin">
              <p styleName="about__admin-text">Admin</p>
              <div styleName="about__admin-functions">
                <p
                  styleName="about__admin-change-image"
                  onClick={() => selectedFileRef.current?.click()}
                >
                  Change Image
                </p>
                {selectedFile || communityData.imageURL ? (
                  <img
                    styleName="about__admin-image"
                    src={selectedFile || communityData.imageURL}
                    alt="current subreddit"
                  />
                ) : (
                  <FaReddit styleName="about__admin-image" />
                )}
              </div>
              {selectedFile && (
                <p
                  styleName="about__admin-change-image"
                  onClick={onUpdateImage}
                >
                  Save Changes
                </p>
              )}
              <input
                ref={selectedFileRef}
                type="file"
                accept="image/x-png, image/gif, image/jpeg"
                hidden
                onChange={onSelectImage}
              />
            </div>
          )}
        </>
      ) : (
        <Article
          animate={true}
          backgroundColor={"#333"}
          foregroundColor={"#999"}
          speed={1}
        />
      )}
    </Card>
  );
};

export default CSSModules(About, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
