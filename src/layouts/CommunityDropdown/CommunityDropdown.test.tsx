import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import CommunityDropdown from "./CommunityDropdown";

describe("CommunityDropdown", () => {
  test("snapshot", () => {
    const { asFragment } = render(<CommunityDropdown dropdown="community" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
