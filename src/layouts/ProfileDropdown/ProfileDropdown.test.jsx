import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProfileDropdown from "./ProfileDropdown";
import StoreProvider from "../../redux/provider";
import * as firebase from "../../firebase";

describe("ProfileDropdown", () => {
  test("snapshot", () => {
    const { asFragment } = render(<ProfileDropdown />);

    expect(asFragment()).toMatchSnapshot();
  });

});
