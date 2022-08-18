import React from "react";
import {
  queryByTestId,
  queryByText,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Post from "./Post";
import each from "jest-each";

describe("Post", () => {
  const mockProps = {
    data: {
      title: "mock title",
      description: "mock description",
      voteStatus: 0,
    },
    renderHover: false,
  };

  test("snapshot", () => {
    const { asFragment } = render(<Post {...mockProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
  test("post rendering correctly", () => {
    render(<Post {...mockProps} />);

    const postTitle = screen.queryByText("mock title");
    const postDescription = screen.queryByText("mock description");
    const postVoteStatus = screen.queryByText("0");

    expect(postTitle).toBeInTheDocument();
    expect(postDescription).toBeInTheDocument();
    expect(postVoteStatus).toBeInTheDocument();
  });

  test("post having hover border", () => {
    render(<Post {...mockProps} renderHover={true} />);

    const post = screen.queryByTestId("post");
    expect(post?.classList.contains("post-excerpt-hover")).toBe(true);
  });
});
