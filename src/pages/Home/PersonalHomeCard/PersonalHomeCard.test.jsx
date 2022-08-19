import {
  getByRole,
  queryByPlaceholderText,
  queryByRole,
  queryByText,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import PersonalHomeCard from "./PersonalHomeCard";
import StoreProvider from "../../../redux/provider";
import * as subredditSlice from "../../../features/subreddit/subredditSlice";

describe("PersonalHomeCard", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <StoreProvider>
        <PersonalHomeCard />
      </StoreProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  // test("user clicking 'Create Community' opens up community modal", async () => {
  //   render(
  //     <StoreProvider>
  //       <PersonalHomeCard />
  //     </StoreProvider>
  //   );

  //   const user = userEvent.setup();

  //   const createCommunityButton = screen.queryByText("Create Community");

  //   await user.click(createCommunityButton);

  //   const spy = jest.spyOn(subredditSlice, "toggleCommunityModalState");

  //   expect(spy).toHaveBeenCalled();
  // });
});
