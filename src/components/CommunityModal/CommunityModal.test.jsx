import React from "react";
import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import CommunityModal from "./CommunityModal";
import { MemoryRouter } from "react-router-dom";

describe("CommunityModal", () => {
  test("snapshot", () => {
    const { asFragment } = render(<CommunityModal />);

    expect(asFragment()).toMatchSnapshot();
  });
  test("test that a subreddit is created", () => {});
  test("user is redirected to the subreddit that was just created", () => {
    render(
        <MemoryRouter>
            <CommunityModal />
        </MemoryRouter>
    );

    const user = userEvent.setup();

    const subredditNameInput = screen.queryByPlaceholderText("r/gaming")

  });
});
