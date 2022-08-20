import CSSModules from "react-css-modules";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./CommunityDropdown.module.css";
import {
  selectCommunityData,
  toggleCommunityModalState,
} from "../../features/subreddit/subredditSlice";
import { AiOutlinePlus } from "react-icons/ai";
import { useDeferredValue, useEffect, useReducer, useState } from "react";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db, getUserId } from "../../firebase";
import { Action } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

interface Props {
  dropdown: string;
}

interface Community {
  communityId: string;
  isModerator: boolean;
}

const CommunityDropdown: React.FC<Props> = ({ dropdown }) => {
  const dispatch = useAppDispatch();

  const { name } = useAppSelector(selectCommunityData);

  const [userCommunities, setUserCommunities] = useState<DocumentData>();

  useEffect(() => {
    async function fetchUserCommunities() {
      const userCommunities = collection(
        db,
        `users/${getUserId()}/communitySnippets`
      );

      const communities = await getDocs(userCommunities);
      setUserCommunities(communities.docs);
    }
    fetchUserCommunities();
  }, [name]);
  return (
    <Dropdown dropdown={dropdown}>
      <div styleName="community__dropdown">
        <p styleName="community__dropdown-my-communities">MY COMMUNITIES</p>
        <button
          styleName="community__dropdown-button"
          onClick={() => dispatch(toggleCommunityModalState())}
        >
          <AiOutlinePlus styleName="community__dropdown-icon" />
          Create Community
        </button>
      </div>
      <div>
        {userCommunities?.map((doc: DocumentData) => (
          <Link
            styleName="community-dropdown__link"
            to={`/r/${doc.data().communityId}`}
          >
            <img
              styleName="community-dropdown__image"
              src="https://styles.redditmedia.com/t5_3sulg5/styles/communityIcon_3gjyit8k2oo61.png"
              alt="amc"
            />
            <span styleName="community-dropdown__community">
              r/{doc.data().communityId}
            </span>
          </Link>
        ))}
      </div>
    </Dropdown>
  );
};

export default CSSModules(CommunityDropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
