import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProfileDropdown from "./ProfileDropdown";
import StoreProvider from "../../redux/provider";
import * as firebase from "../../firebase";
import { MemoryRouter } from "react-router-dom";

describe("ProfileDropdown", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ProfileDropdown />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  test("user signs out", async () => {
    const mockSignOutUser = jest.fn();
    jest.mock("../../firebase", () => ({
      ...jest.requireActual("../../firebase"),
      signOutUser: mockSignOutUser,
    }));
    render(
      <MemoryRouter>
        <ProfileDropdown dropdown="profile-width" />
      </MemoryRouter>
    );

    const signOutButton = screen.queryByRole("button", { name: /Log Out/i });

    await userEvent.click(signOutButton);

    expect(mockSignOutUser).toHaveBeenCalledTimes(1);
  });
  test("user navigates to their profile", async () => {
    const mockUseNavigate = jest.fn();

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockUseNavigate,
    }));

    render(
      <MemoryRouter>
        <ProfileDropdown dropdown="profile-width" />
      </MemoryRouter>
    );

    const profileButton = screen.queryByRole("button", { name: /Profile/i });

    await userEvent.click(profileButton);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
  });
});
