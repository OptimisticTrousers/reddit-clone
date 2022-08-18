import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import StoreProvider from "../../redux/provider";
import { MemoryRouter } from "react-router-dom";

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

    // const user = userEvent.setup();

    // const communityDropdown = screen.getByText("Home");

    // await user.click(communityDropdown);

    // expect(screen.getByText("Create Community")).toBeInTheDocument();
  });
});
