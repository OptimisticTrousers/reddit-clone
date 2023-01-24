/* eslint-disable eqeqeq */
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
import { db, getUser, getUserId, getUserName } from "../../firebase";
import Filter from "../../components/Filter/Filter";
import Comments from "../Subreddit/Comments/Comments";
import Posts from "../Subreddit/Posts/Posts";
import Header from "./Header/Header";
import styles from "./Profile.module.css";
import UserCard from "./UserCard/UserCard";
import { useAppSelector, useFilter } from "../../hooks/hooks";
import Card from "../../components/Card/Card";
import ProfileNotFound from "./ProfileNotFound/ProfileNotFound";
import { Navigate, useNavigate } from "react-router-dom";
import { displayPartsToString } from "typescript";
import {
  selectAuthStatus,
  toggleSignInModal,
} from "../../features/auth/authSlice";
import Main from "../../layouts/Main/Main";
import Aside from "../../layouts/Aside/Aside";
import { createHash } from "crypto";

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
    case "SAVED":
      return {
        posts: false,
        comments: false,
        upvotes: false,
        downvotes: false,
        saved: true,
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

  const [savedPosts, setSavedPosts] = useState<DocumentData | undefined>();

  function addPosts() {}

  const [downVotesPosts, setDownVotesPosts] = useState<
    DocumentData | undefined
  >();

  const isLoggedIn = useAppSelector(selectAuthStatus);
  const navigate = useNavigate();

  const [activeSection, dispatch] = useReducer(reducer, {
    posts: true,
    comments: false,
    upvotes: false,
    downvotes: false,
    saved: false,
  });

  useEffect(() => {
    async function getUserPosts() {
      if (!isLoggedIn) {
        dispatch(toggleSignInModal());
        return;
      }
      try {
        const userPostsRef = collection(db, "posts");

        const q = query(userPostsRef, where("userId", "==", getUserId()));

        const userPostsDoc = await getDocs(q);
        setUserPosts(userPostsDoc.docs);
      } catch (error) {
        console.log(`Could not get posts created by the user: ${error}`);
      }
    }
    getUserPosts();
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    async function fetchComments() {
      if (!isLoggedIn) {
        dispatch(toggleSignInModal());
        return;
      }
      try {
        const userCommentsRef = collection(db, "comments");

        const q = query(userCommentsRef, where("userId", "==", getUserId()));

        const userCommentsDoc = await getDocs(q);

        setCommentsPostId(userCommentsDoc.docs[0].data().postId);
        setUserComments(userCommentsDoc.docs);
      } catch (error) {
        console.log(`Could not fetch comments: ${error}`);
      }
    }
    fetchComments();
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    async function fetchPostsFromUpVotes() {
      if (!isLoggedIn) {
        dispatch(toggleSignInModal());
        return;
      }
      try {
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
      } catch (error) {
        console.log(`Could not fetch upvoted posts: ${error}`);
      }
    }

    fetchPostsFromUpVotes();
  }, [isLoggedIn]);

  useEffect(() => {
    async function fetchPostsFromDownVotes() {
      if (!isLoggedIn) {
        dispatch(toggleSignInModal());
        return;
      }
      try {
        const downVotesRef = collection(
          db,
          "users",
          `${getUserId()}/postVotes`
        );

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
      } catch (error) {
        console.log(`Could not fetch downvoted posts: ${error}`);
      }
    }

    fetchPostsFromDownVotes();
  }, [isLoggedIn]);

  useEffect(() => {
    async function fetchSavedPosts() {
      if (!isLoggedIn) {
        dispatch(toggleSignInModal());
        return;
      }

      try {
        const savedPostsRef = collection(db, "savedPosts");

        const q = query(savedPostsRef, where("userId", "==", getUserId()));

        const { docs } = await getDocs(q);

        const newDocs = docs.map(async (document: DocumentData) => {
          const postId = document.data().postId;

          const postRef = doc(db, "posts", postId);

          const data = await getDoc(postRef);

          return data;
        });

        const resolvedData = await Promise.all(newDocs);

        setSavedPosts(resolvedData);
      } catch (error) {
        console.log(`Could not fetch saved posts: ${error}`);
      }
    }

    fetchSavedPosts();
  }, [isLoggedIn]);

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div styleName="profile-container">
      <Header dispatch={dispatch} activeSection={activeSection} />
      <Main>
        <div styleName="content" ref={contentRef}>
          {activeSection.posts && <Posts posts={userPosts} />}
          {activeSection.comments && (
            <Card>
              <Comments
                comments={userComments}
                commentsPostId={commentsPostId}
              />
            </Card>
          )}
          {activeSection.downvotes && <Posts posts={downVotesPosts} />}
          {activeSection.upvotes && <Posts posts={upVotesPosts} />}
          {activeSection.saved && <Posts posts={savedPosts} />}
          {activeSection.downvotes && downVotesPosts?.length == false && (
            <ProfileNotFound
              text={`hmm... looks like you haven't downvoted anything yet`}
            />
          )}
          {activeSection.upvotes && upVotesPosts?.length == false && (
            <ProfileNotFound
              text={`hmm... looks like you haven't upvoted anything yet`}
            />
          )}
          {activeSection.posts && userPosts?.length == false && (
            <ProfileNotFound
              text={`hmm... u/${getUserName()} hasn't posted anything`}
            />
          )}
          {activeSection.comments && userComments?.length == false && (
            <ProfileNotFound
              text={`hmm... u/${getUserName()} hasn't commented on anything`}
            />
          )}
          {activeSection.saved && savedPosts?.length == false && (
            <ProfileNotFound
              text={`hmm... u/${getUserName()} hasn't saved any posts`}
            />
          )}
        </div>
        <Aside>
          <UserCard />
        </Aside>
      </Main>
    </div>
  );
};

export default CSSModules(Profile, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
