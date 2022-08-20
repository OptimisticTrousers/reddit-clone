import {
  queryByPlaceholderText,
  queryByText,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import CommunityDropdown from "./CommunityDropdown";
import * as subredditSlice from "../../features/subreddit/subredditSlice";
import StoreProvider from "../../redux/provider";

describe("CommunityDropdown", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <StoreProvider>
        <CommunityDropdown dropdown="community" handleHomeDropdown={jest.fn()}/>
      </StoreProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  test("opens community modal when user clicks", async () => {
    render(
      <StoreProvider>
        <CommunityDropdown dropdown="community" handleHomeDropdown={jest.fn()}/>
      </StoreProvider>
    );

    // const mockToggleCommunityModalState =
    //   toggleCommunityModalState as jest.MockedFunction<
    //     typeof toggleCommunityModalState
    //   >;

    jest.spyOn(subredditSlice, "toggleCommunityModalState");

    const createCommunityButton = screen.queryByRole("button", {
      name: /Create Community/i,
    });

    const user = userEvent.setup();

    await user.click(createCommunityButton!);

    expect(subredditSlice.toggleCommunityModalState).toHaveBeenCalledTimes(1);
  });
});
