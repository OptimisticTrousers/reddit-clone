import CSSModules from "react-css-modules";
import Card from "../../../components/Card/Card";
import styles from "./TopCommunities.module.css";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import UpworkJobLoader from "../../../components/Skeletons/UpworkJobLoader";

const TopCommunitiesCard: React.FC = () => {
  const [topCommunities, setTopCommunities] = useState<
    DocumentData | undefined
  >();

  const navigate = useNavigate();

  useEffect(() => {
    const subredditsRef = collection(db, "subreddits");

    const q = query(subredditsRef, orderBy("numberOfMembers", "asc"), limit(5));
    getDocs(q).then((data) => {
      setTopCommunities(data.docs);
    });
  }, []);

  function subredditLinkClick(subredditName: string) {
    navigate(`/r/${subredditName}`);
  }

  return (
    <Card>
      <div styleName="top-communities__top-community-image">
        <h2 styleName="top-communities__top-community-title">
          Top Communities
        </h2>
      </div>
      <ol styleName="top-communities__top-community-list">
        {topCommunities?.map((doc: DocumentData, index: number) => {
          return (
            <li styleName="top-communities__top-community-item">
              <a styleName="top-communities__top-community-details">
                <p styleName="top-communities__top-community-rank">
                  {index + 1}
                </p>
                <IoIosArrowUp styleName="top-communities__top-community-icon" />
                <span styleName="top-communities__top-community-name">
                  {doc.data().name}
                </span>
              </a>
              <button
                styleName="top-communities__top-community-button top-communities__top-community-button_type_join"
                onClick={() => subredditLinkClick(doc.data().name)}
              >
                Join
              </button>
            </li>
          );
        }) ?? (
          <div styleName="top-communities__skeletons">
            <UpworkJobLoader
              animate={true}
              width={321}
              backgroundColor={"#333"}
              foregroundColor={"#999"}
              speed={1}
            />
            <UpworkJobLoader
              animate={true}
              width={321}
              backgroundColor={"#333"}
              foregroundColor={"#999"}
              speed={1}
            />
            <UpworkJobLoader
              animate={true}
              width={321}
              backgroundColor={"#333"}
              foregroundColor={"#999"}
              speed={1}
            />
          </div>
        )}
      </ol>
      <button styleName="top-communities__top-community-button top-communities__top-community-button_type_view">
        View All
      </button>
    </Card>
  );
};

export default CSSModules(TopCommunitiesCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
