import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import SinglePostPage from "./SinglePostPage";

describe("SinglePostPage", () => {
  test("snapshot", () => {
    const { asFragment } = render(<SinglePostPage />);

    expect(asFragment()).toMatchSnapshot();
  });
});
