import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import CommentsSection from "./CommentsSection";

describe("CommentsSection", () => {
  test("snapshot", () => {
    const { asFragment } = render(<CommentsSection />);

    expect(asFragment()).toMatchSnapshot();
  });
});
