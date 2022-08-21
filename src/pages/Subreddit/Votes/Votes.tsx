import styles from "./Votes.module.css";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import React, { useReducer, useState } from "react";
import CSSModules from "react-css-modules";
import { selectSignInModalState } from "../../../features/auth/authSlice";

interface Props {
  voteStatus: number;
  subredditId: string;
  postId: string;
}

const Votes: React.FC<Props> = ({ voteStatus, subredditId, postId }) => {
  const [vote, setVote] = useState(voteStatus);

  function handleUpvote() {
    setVote((prevVote) => {
      if (prevVote === voteStatus + 1) {
        return prevVote - 1;
      } else if (prevVote === voteStatus - 1) {
        return prevVote + 2;
      }
      return prevVote + 1;
    });
  }

  function handleDownvote() {
    setVote((prevVote) => {
      if (prevVote === voteStatus - 1) {
        return prevVote + 1;
      } else if (prevVote === voteStatus + 1) {
        return prevVote - 2;
      }
      return prevVote - 1;
    });
  }

  // const handleVote = async () => {
  //   try {
  //     const { voteStatus } = post;

  //     const existingVote = postStateValue.postVotes.find(
  //       (vote) => vote.postId === post.id
  //     );

  //     const batch = writeBatch(db);
  //     const updatedPost = { ...post };
  //     const updatedPosts = [...postStateValue.posts];
  //     let updatedPostVotes = [...postStateValue.postVotes];
  //     let voteChange = vote;

  //     // New vote
  //     if (!existingVote) {
  //       // add or subtract 1 to/from post.postStatus

  //       const postVoteRef = doc(
  //         collection(db, "users", `${getUserId()}/postVotes`)
  //       );

  //       const newVote: any = {
  //         id: postVoteRef.id,
  //         postId: post.id!,
  //         communityId,
  //         voteValue: vote,
  //       };

  //       batch.set(postVoteRef, newVote);
  //       // create a new postVote document
  //       updatedPost.voteStatus = voteStatus + vote;

  //       updatedPostVotes = [...updatedPostVotes, newVote];
  //     }
  //     // Existing vote - they have votedon the post before
  //     else {
  //       const postVoteRef = doc(
  //         db,
  //         "users",
  //         `${getUserId()}/postVotes/${existingVote.id}`
  //       );

  //       if (existingVote.voteValue === vote) {
  //         // add or subtract 1 to/from post.postStatus
  //         updatedPost.voteStatus = voteStatus - vote;
  //         updatedPostVotes = updatedPostVotes.filter(
  //           (vote) => vote.id !== existingVote.id
  //         );

  //         batch.delete(postVoteRef);

  //         voteChange *= -1;
  //         // delete the postVote document
  //       }
  //       // Flip their vote
  //       else {
  //         // add or subtract 2 to/from post.postStatus
  //         updatedPost.voteStatus = voteStatus + 2 * vote;

  //         const voteIdx = postStateValue.postVotes.findIndex(
  //           (vote) => vote.id === existingVote.id
  //         );

  //         updatedPostVotes[voteIdx] = {
  //           ...existingVote,
  //           voteValue: vote,
  //         };
  //         // Updating the existing postVote document

  //         batch.update(postVoteRef, {
  //           voteValue: vote,
  //         });
  //       }
  //     }

  //     const postRef = doc(db, "posts", post.id!);
  //     batch.update(postRef, { voteStatus: voteStatus + voteChange });

  //     await batch.commit();
  //     // update state with updated values
  //     const postIdx = postStateValue.posts.findIndex(
  //       (item) => item.id === post.id
  //     );

  //     updatedPosts[postIdx] = updatedPost;

  //     setPostStateValue((prev) => ({
  //       ...prev,
  //       posts: updatedPosts,
  //       postVotes: updatedPostVotes,
  //     }));
  //   } catch (error) {
  //     console.log(`ERROR: ${error}`);
  //   }
  // };

  return (
    <div styleName="votes">
      <div styleName="votes__vote votes__vote_type_upvote">
        <BiUpvote
          styleName="votes__icon "
          onClick={handleUpvote}
        />
      </div>
      <p styleName="votes__likes">{vote}</p>
      <div styleName="votes__vote votes__vote_type_downvote">
        <BiDownvote
          styleName="votes__icon"
          onClick={handleDownvote}
        />
      </div>
    </div>
  );
};

export default CSSModules(Votes, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
