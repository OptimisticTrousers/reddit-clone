import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Posts from "./Posts";

describe("Posts", () => {
  test("snapshot", () => {
    const { asFragment } = render(<Posts />);

    expect(asFragment()).toMatchSnapshot();
  });
});
