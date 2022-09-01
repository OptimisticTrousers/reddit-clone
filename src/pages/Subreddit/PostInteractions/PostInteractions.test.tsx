import React from "react";
import { queryByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import PostInteractions from "./PostInteractions";
import Post from "../Post/Post";

describe("PostInteractions", () => {
  test("snapshot", () => {
    const { asFragment } = render(<PostInteractions commentsQuantity={0} postId="mock post id"/>);

    expect(asFragment()).toMatchSnapshot();
  });
  each([39, 251, 100, 512, 21, 51, 12, 1]).test("renders number of comments correctly", (a) => {
    render(<PostInteractions commentsQuantity={a} postId="mock post id"/>)

    const commentsQuantityText = screen.queryByText(`${a} Comments`)

    expect(commentsQuantityText).toBeInTheDocument();
  })
});
