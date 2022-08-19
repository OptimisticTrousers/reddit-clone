import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Comments from "./Comments";

describe("Comments", () => {
  test("snapshot", () => {
    const { asFragment } = render(<Comments />);

    expect(asFragment()).toMatchSnapshot();
  });
});
