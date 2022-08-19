import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Profile from "./Profile";

describe("Profile", () => {
  test("snapshot", () => {
    const { asFragment } = render(<Profile isLoggedIn={true} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
