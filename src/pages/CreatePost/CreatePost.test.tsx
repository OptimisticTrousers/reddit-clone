import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import CreatePost from "./CreatePost";

describe("CreatePost", () => {
  test("snapshot", () => {
    const { asFragment } = render(<CreatePost />);

    expect(asFragment()).toMatchSnapshot();
  });
});
