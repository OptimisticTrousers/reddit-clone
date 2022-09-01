import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import PostInteractions from "./PostInteractions";

describe("PostInteractions", () => {
  test("snapshot", () => {
    const { asFragment } = render(<PostInteractions commentsQuantity={0} postId="mock post id"/>);

    expect(asFragment()).toMatchSnapshot();
  });
});
