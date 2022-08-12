import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import StoreProvider from "../../redux/provider";

describe("Navbar", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <StoreProvider>
        <Navbar />
      </StoreProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  test("clicking log in opens modal", async () => {
    render(
      <StoreProvider>
        <Navbar />
      </StoreProvider>
    );

    // // const user = userEvent.setup()

    // // const modal = queryBy

    // await user.click()

  });
});
