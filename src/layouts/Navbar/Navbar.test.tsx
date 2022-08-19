import React from "react";
import {
  getByText,
  queryByPlaceholderText,
  queryByRole,
  queryByText,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import StoreProvider from "../../redux/provider";
import { MemoryRouter } from "react-router-dom";
import * as authSlice from "../../features/auth/authSlice";
import * as hooks from "../../hooks/hooks";

describe("Navbar", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <StoreProvider>
          <Navbar />
        </StoreProvider>
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  test("clicking Home tab opens commmunity tab", async () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <Navbar />
        </StoreProvider>
      </MemoryRouter>
    );

    const user = userEvent.setup();

    const communityDropdown = screen.getByText("Home");

    await user.click(communityDropdown);

    expect(screen.getByText("Create Community")).toBeInTheDocument();
  });
  test("clicking Log in opens Modal", async () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <Navbar />
        </StoreProvider>
      </MemoryRouter>
    );

    jest.spyOn(authSlice, "toggleSignInModal");
    const user = userEvent.setup();

    const logInButton = screen.queryByText("Log In");

    await user.click(logInButton!);

    expect(authSlice.toggleSignInModal).toHaveBeenCalledTimes(1);
  });
  // test("clicking Sign Up opens Modal", async () => {
  //   render(
  //     <MemoryRouter>
  //       <StoreProvider>
  //         <Navbar />
  //       </StoreProvider>
  //     </MemoryRouter>
  //   );

  //   jest.spyOn(authSlice, "toggleSignUpModal");
  //   const user = userEvent.setup();

  //   const logInButton = screen.queryByText("Sign Up");

  //   await user.click(logInButton!);

  //   expect(authSlice.toggleSignUpModal).toHaveBeenCalledTimes(1);
  // });
});
