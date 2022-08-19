import CSSModules from "react-css-modules";
import { useAppDispatch } from "../../hooks/hooks";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./CommunityDropdown.module.css";
import { toggleCommunityModalState } from "../../features/subreddit/subredditSlice";
import { AiOutlinePlus } from "react-icons/ai";
import { useDeferredValue, useEffect, useReducer, useState } from "react";
import { doc, DocumentData, getDoc, getDocs } from "firebase/firestore";
import { db, getUserId } from "../../firebase";
import { Action } from "@reduxjs/toolkit";

interface Props {
  dropdown: string;
}

interface Community {
  subredditName: string;
}

const CommunityDropdown: React.FC<Props> = ({ dropdown }) => {
  const dispatch = useAppDispatch();

  const [userCommunities, setUserCommunities] = useState<DocumentData>();

  useEffect(() => {
    async function fetchUserCommunities() {
      const userCommunities = doc(db, "users", `${getUserId()}`);

      const data = await getDoc(userCommunities);

      setUserCommunities(data?.data()?.communities);
    }
    fetchUserCommunities();
  });
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
        {userCommunities?.map((userCommunity: Community) => (
          <p>{userCommunity.subredditName}</p>
        ))}
      </div>
    </Dropdown>
  );
};

export default CSSModules(CommunityDropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
