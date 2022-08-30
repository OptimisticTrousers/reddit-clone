import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Subreddit from "./Subreddit";

describe("Subreddit", () => {
  test("snapshot", () => {
    const { asFragment } = render(<Subreddit />);

    expect(asFragment()).toMatchSnapshot();
  });
});
