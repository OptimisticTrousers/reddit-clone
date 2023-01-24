import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import CSSModules from "react-css-modules";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import {
  selectCommunityData,
  setCommunityData,
} from "../../../features/subreddit/subredditSlice";
import { db } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import styles from "./FetchSubredditData.module.css";

const FetchSubredditData: React.FC = () => {
  const { subredditName } = useParams();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const communityData = useAppSelector(selectCommunityData);

  useEffect(() => {
    async function getSubredditData() {
      try {
        const subredditsRef = collection(db, "subreddits");

        const q = query(subredditsRef, where("name", "==", subredditName));

        const {
          docs: [communityData],
        } = await getDocs(q);

        dispatch(
          setCommunityData({
            ...communityData.data(),
            createdAt: communityData.data().createdAt.seconds,
          })
        );
      } catch (error) {
        console.log(`There seemed to be an error fetching data: ${error}`);
        // navigate("/");
      }
    }

    // Only fetching data if the communityData is empty
    if (communityData.name !== subredditName) {
      getSubredditData();
    }
  }, [subredditName, dispatch, communityData, navigate]);

  return <Outlet />;
};

export default CSSModules(FetchSubredditData, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
