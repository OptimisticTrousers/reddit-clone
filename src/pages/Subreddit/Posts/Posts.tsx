import {
  collection,
  doc,
  DocumentChange,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import PostExcerpt from "../PostExcerpt/PostExcerpt";
import styles from "./Posts.module.css";
import { db } from "../../../firebase";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";

// type PostsType = Array<{
//   title: string;
//   description: string;
//   id: string;
// }> | null;

type PostsType = DocumentChange<DocumentData>[];

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostsType | null>(null);

  useEffect(() => {
    const subredditPostsRef = collection(db, "posts");

    getDocs(subredditPostsRef).then((subredditPosts) => {
      setPosts(subredditPosts.docChanges());
    });
  }, []);

  // const onVote = async(post, vote, communityId) => {
  //   //check for a user => if not, open
  //   if(newVote) {
  //     //add/subtract 1 to/from post.voteStatus

  //   } else {
  //     //Removing their vote
  //     if(removingVote) {
  //     //add/subtract 1 to/from post.voteStatus
  //     //delete the postVote document

  //     } else {
  //       //Flip
  //       // add/subtract 2 to/from post.voteStatus
  //       // updating the existing postVote document
  //     }
  //   }
  // }

  return (
    <div styleName="container">
      {posts?.map(({ doc }) => {
        const data = doc.data();
        return (
          <Link key={doc.id} to={doc.id} state={{ ...data }}>
            <PostExcerpt key={doc.id} data={data} />
          </Link>
        );
      })}
    </div>
  );
};

export default CSSModules(Posts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
