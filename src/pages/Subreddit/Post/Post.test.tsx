import React from "react";
import {
  queryByTestId,
  queryByText,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Post from "./Post"

describe("Post", () => {
  const mockProps = {
    data: {
      title: "mock title",
      description: "mock description",
      voteStatus: 0,
      userVoteValue: 0
    },
    commentsQuantity: 0,
  };

  // test("snapshot", () => {
  //   const { asFragment } = render(<Post {...mockProps} />);

  //   expect(asFragment()).toMatchSnapshot();
  // });
  // test("post rendering correctly", () => {
  //   render(<Post {...mockProps} />);

  //   const postTitle = screen.queryByText("mock title");
  //   const postDescription = screen.queryByText("mock description");
  //   const postVoteStatus = screen.queryByText("0");

  //   expect(postTitle).toBeInTheDocument();
  //   expect(postDescription).toBeInTheDocument();
  //   expect(postVoteStatus).toBeInTheDocument();
  // });

  // test("post having hover border", () => {
  //   render(<Post {...mockProps} />);

  //   const post = screen.queryByTestId("post");
  //   expect(post?.classList.contains("post-excerpt-hover")).toBe(true);
  // });
  // test("Redirecting user to the post page when clicked", 9) => {
  //   return (
  //     <MemoryRouter>

  //     </MemoryRouter>
  //   )
  // }
});
