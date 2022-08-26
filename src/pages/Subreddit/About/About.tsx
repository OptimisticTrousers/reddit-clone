import CSSModules from "react-css-modules";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/CardHeader/CardHeader";
import {
  selectCommunityData,
  setCommunityData,
} from "../../../features/subreddit/subredditSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import styles from "./About.module.css";
import moment from "moment";
import { TbCake } from "react-icons/tb";
import Article from "../../../components/Skeletons/Article";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, getUserId } from "../../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../../../firebase/firebase-config";
import { FaReddit } from "react-icons/fa";

const About: React.FC = () => {
  const communityData = useAppSelector(selectCommunityData);

  const data = useAppSelector(selectCommunityData);

  const { subredditName } = useParams();

  const [isUserModerator, setIsUserModerator] = useState(false);

  const [selectedFile, setSelectedFile] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const communitySnippetsRef = doc(
      db,
      "users",
      `/${getUserId()}/communitySnippets/${communityData.name}`
    );

    getDoc(communitySnippetsRef).then((doc: DocumentData) => {
      setIsUserModerator(doc?.data()?.isModerator);
    });
  }, [communityData.name]);

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
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "subreddits", communityData.name), {
        imageURL: downloadURL,
      });

      dispatch(setCommunityData({ ...communityData, imageURL: downloadURL }));
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };

  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Card>
      <CardHeader />
      {Object.keys(communityData).length !== 0 ? (
        <>
          {isUserModerator ? (
            <h1>Bob</h1>
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
          {/* <button styleName="about__button about__button_type_options">
            Community Options
            <IoIosArrowDown />
          </button> */}
          {/* <hr styleName="about__thematic-break"></hr> */}
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
                <img
                  styleName="about__admin-image"
                  src={selectedFile || communityData.imageURL}
                  alt="current profile picture"
                />
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
