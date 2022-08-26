import styles from "./Header.module.css";
import subredditLogo from "../../../assets/subreddit-logo.svg";
import classNames from "classnames";
import CSSModules from "react-css-modules";
import { useAppSelector } from "../../../hooks/hooks";
import { selectCommunityData } from "../../../features/subreddit/subredditSlice";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  runTransaction,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db, getUser, getUserId, isUserSignedIn } from "../../../firebase";
import { useEffect, useState } from "react";

interface Props {
  subredditName: string | undefined;
}

const Header: React.FC<Props> = ({ subredditName }) => {
  const { name } = useAppSelector(selectCommunityData);
  const [joinButtonText, setJoinButtonText] = useState("Join");

  async function joinCommunity() {
    if (isUserSignedIn()) {
      try {

        await runTransaction(db, async (transaction) => {
        const userRef = doc(
          db,
          `users/${getUserId()}/communitySnippets/${subredditName}`
        );
        const communityDocRef = doc(db, "subreddits", name);

        const docData  = await transaction.get(communityDocRef);

        if (docData.data()?.creatorId === getUserId()) {
          transaction.set(userRef, {
            communityId: subredditName,
            isModerator: true,
          });
        } else {
          transaction.set(userRef, {
            communityId: subredditName,
            isModerator: false,
          });
        }
        const subredditRef = doc(db, `subreddits/${subredditName}`);

        transaction.set(subredditRef, {
          numberOfMembers: increment(1),
        });

        })

        setJoinButtonText("Joined");
      } catch (error) {
        alert(`ERROR: ${error}`);
      }
    } else {
      alert("SIGN IN TO JOIN COMMUNITY");
    }
  }

  async function leaveCommunity() {
    try {
      const communityRef = doc(
        db,
        `users/${getUserId()}/communitySnippets/${subredditName}`
      );

      await deleteDoc(communityRef);
      setJoinButtonText("Join");

      const subredditRef = doc(db, `subreddits/${subredditName}`);

      await updateDoc(subredditRef, {
        numberOfMembers: increment(-1),
      });
    } catch (error) {
      alert(`ERROR: ${error}`);
    }
  }

  useEffect(() => {
    async function fetchIfUserJoined() {
      const userCommunities = collection(
        db,
        `users/${getUserId()}/communitySnippets`
      );

      const communities = await getDocs(userCommunities);

      const community = communities
        .docChanges()
        .find(
          (community) => community.doc.data().communityId === subredditName
        );
      if (community) {
        setJoinButtonText("Joined");
      }
    }
    fetchIfUserJoined();
  });

  return (
    <div styleName="header">
      <div styleName="header__background"></div>
      <div styleName="header__container">
        <div styleName="header__content">
          <img
            styleName="header__subreddit-picture"
            src={subredditLogo}
            alt="default subreddit logo"
          />
          <div styleName="header__title-container">
            <div styleName="header__title">
              <h1 styleName="header__subreddit-name">{subredditName}</h1>
              <h2 styleName="header__subreddit-link">r/{subredditName}</h2>
            </div>
            <div styleName="header__buttons">
              {/* <button styleName=assNames(s["header__button"], s["header__button_type"]>Join</button> */}
              <button
                styleName="header__button"
                onClick={
                  joinButtonText === "Join" ? joinCommunity : leaveCommunity
                }
              >
                {joinButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(Header, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
