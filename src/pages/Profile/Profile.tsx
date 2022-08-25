import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useReducer, useRef, useState } from "react";
import CSSModules from "react-css-modules";
import { db, getUserId, isUserSignedIn } from "../../firebase";
import Filter from "../../components/Filter/Filter";
import Comments from "../Subreddit/Comments/Comments";
import Posts from "../Subreddit/Posts/Posts";
import Header from "./Header/Header";
import styles from "./Profile.module.css";
import UserCard from "./UserCard/UserCard";
import { useFilter } from "../../hooks/hooks";
import Card from "../../components/Card/Card";
import ProfileNotFound from "./ProfileNotFound/ProfileNotFound";

interface State {
  posts: boolean;
  comments: boolean;
  upvotes: boolean;
  downvotes: boolean;
  saved: boolean;
}

interface Action {
  type: string;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "POSTS":
      return {
        posts: true,
        comments: false,
        upvotes: false,
        downvotes: false,
        saved: false,
      };
    case "COMMENTS":
      return {
        posts: false,
        comments: true,
        upvotes: false,
        downvotes: false,
        saved: false,
      };
    case "UPVOTES":
      return {
        posts: false,
        comments: false,
        upvotes: true,
        downvotes: false,
        saved: false,
      };
    case "DOWNVOTES":
      return {
        posts: false,
        comments: false,
        upvotes: false,
        downvotes: true,
        saved: false,
      };
    default:
      return state;
  }
}

const Profile: React.FC = () => {
  const filter = useFilter();

  const [userPosts, setUserPosts] = useState<DocumentData | undefined>();

  const [userComments, setUserComments] = useState<DocumentData | undefined>();

  const [commentsPostId, setCommentsPostId] = useState<string | undefined>();

  const [upVotesPosts, setUpVotesPosts] = useState<DocumentData | undefined>();

  function addPosts() {}

  const [downVotesPosts, setDownVotesPosts] = useState<
    DocumentData | undefined
  >();

  const [activeSection, dispatch] = useReducer(reducer, {
    posts: false,
    comments: false,
    upvotes: false,
    downvotes: false,
    saved: false,
  });

  useEffect(() => {
    const userPostsRef = collection(db, "posts");

    const q = query(
      userPostsRef,
      where("userId", "==", "fUKdoF2TCBcVFEzIaQaa2NJtcEn1")
    );

    getDocs(q).then((data: DocumentData) => {
      setUserPosts(data.docs);
    });
  }, []);

  useEffect(() => {
    const userCommentsRef = collection(db, "comments");

    const q = query(
      userCommentsRef,
      where("userId", "==", "fUKdoF2TCBcVFEzIaQaa2NJtcEn1")
    );

    getDocs(q).then((data: DocumentData) => {
      setCommentsPostId(data.docs[0].data().postId);
      setUserComments(data.docs);
    });
  }, []);

  useEffect(() => {
    async function fetchPostsFromUpVotes() {
      const upVotesRef = collection(db, "users", `${getUserId()}/postVotes`);

      const q = query(upVotesRef, where("voteValue", "==", 1));

      const { docs } = await getDocs(q);

      const newDocs = docs.map(async (document: DocumentData) => {
        const postId = document.data().postId;

        const postRef = doc(db, "posts", postId);

        const data = await getDoc(postRef);

        return data;
      });

      const resolvedData = await Promise.all(newDocs);

      setUpVotesPosts(resolvedData);
    }

    fetchPostsFromUpVotes();
  }, []);

  useEffect(() => {
    async function fetchPostsFromDownVotes() {
      const downVotesRef = collection(db, "users", `${getUserId()}/postVotes`);

      const q = query(downVotesRef, where("voteValue", "==", -1));

      const { docs } = await getDocs(q);

      const newDocs = docs.map(async (document: DocumentData) => {
        const postId = document.data().postId;

        const postRef = doc(db, "posts", postId);

        const data = await getDoc(postRef);

        return data;
      });

      const resolvedData = await Promise.all(newDocs);

      setDownVotesPosts(resolvedData);
    }

    fetchPostsFromDownVotes();
  }, []);

  return (
    <div>
      <Header dispatch={dispatch} activeSection={activeSection} />
      <main styleName="main">
        <div styleName="content">
          <Filter {...filter} addPosts={addPosts} />
          {activeSection.posts && <Posts posts={userPosts} />}
          {activeSection.comments && (
            <Card>
              <Comments
                comments={userComments}
                postId={commentsPostId}
                renderCommentPost={true}
              />
            </Card>
          )}
          {activeSection.upvotes && <Posts posts={upVotesPosts} />}
          {activeSection.downvotes && <Posts posts={downVotesPosts} />}
        </div>
        <aside styleName="aside">
          <UserCard />
        </aside>
      </main>
    </div>
  );
};

export default CSSModules(Profile, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
