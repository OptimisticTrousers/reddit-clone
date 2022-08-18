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

function reducer(state: DocumentData, action: DocumentData) {
  switch (action.type) {
    case "STORE_COMMUNITIES":
      return action.payload.data().communities;
    default:
      return state;
  }
}

const CommunityDropdown: React.FC<Props> = ({ dropdown }) => {
  const dispatch = useAppDispatch();

  const [userCommunities, userCommunitiesDispatch] = useReducer(reducer, 0);

  useEffect(() => {
    async function fetchUserCommunities() {
      const userCommunities = doc(db, "users", `${getUserId()}`);

      const data = await getDoc(userCommunities);

      userCommunitiesDispatch({ type: "STORE_COMMUNITIES", payload: data });
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
        {userCommunities?.map((userCommunity: any) => (
          <p>{userCommunity}</p>
        ))}
      </div>
    </Dropdown>
  );
};

export default CSSModules(CommunityDropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
