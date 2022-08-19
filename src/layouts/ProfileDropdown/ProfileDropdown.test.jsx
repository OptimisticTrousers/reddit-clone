import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProfileDropdown from "./ProfileDropdown";

describe("ProfileDropdown", () => {
  test("snapshot", () => {
    const { asFragment } = render(<ProfileDropdown />);

    expect(asFragment()).toMatchSnapshot();
  });
});
