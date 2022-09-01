import React from "react";
import { queryByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Comment from "./Comment";
import { getUserName } from "../../../firebase";

describe("Comment", () => {
  test("snapshot", () => {
    const mockProps = {
      comment: {
        content: "this is a mock comment",
      },
      id: "bob",
      postId: "bob jones"
    };
    const { asFragment } = render(
      <Comment {...mockProps}>
        <div>Mock Children</div>
      </Comment>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  test("rendering content correctly", () => {
    const mockProps = {
      comment: {
        content: "this is a mock comment",
        createdAt: {
          seconds: 1662025359,
        },
      },
      id: "bob",
      postId: "bob jones"
    };
    render(
      <Comment {...mockProps}>
        <div>Mock Children</div>
      </Comment>
    );

    const commentText = screen.queryByText("this is a mock comment");

    expect(commentText).toBeInTheDocument();
  });
  test("renders username correctly", () => {
    const mockProps = {
      comment: {
        content: "this is a mock comment",
        createdAt: {
          seconds: 1662025359,
        },
        userName: "bob jones"
      },
      id: "bob",
      postId: "bob jones"
    };
    jest.mock("../../../firebase", () => ({
      ...jest.requireActual("../../../firebase"),
      getUserName: () => "bob jones",
    }));

    render(
      <Comment {...mockProps}>
        <div>Mock Children</div>
      </Comment>
    );

    const userName = screen.queryByTestId("author-description");

    expect(userName?.textContent).toEqual("bob jones")
  });
});
