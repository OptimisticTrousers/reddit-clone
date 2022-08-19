import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import PostCreatorCard from "./PostCreatorCard";

describe("PostCreatorCard", () => {
  test("snapshot", () => {
    const { asFragment } = render(<PostCreatorCard />);

    expect(asFragment()).toMatchSnapshot();
  });
});
