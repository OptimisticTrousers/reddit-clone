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
import { BrowserRouter } from "react-router-dom";

describe("PersonalHomeCard", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <StoreProvider>
          <PersonalHomeCard />
        </StoreProvider>
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  test("open community modal", async () => {

    const mockDispatch = jest.fn();
    jest.mock("../../../hooks/hooks", () => ({
      ...jest.requireActual("../../../hooks/hooks"),
      useAppDispatch: () => mockDispatch,
    }));

    render(
      <BrowserRouter>
        <StoreProvider>
          <PersonalHomeCard />
        </StoreProvider>
      </BrowserRouter>
    );

    const createCommunityButton = screen.queryByText("Create Community");

    await userEvent.click(createCommunityButton);

    expect(mockDispatch).toBeCalledTimes(1);
  });
  test("navigate to create post page", async () => {

    jest.mock("../../../hooks/hooks", () => ({
      ...jest.requireActual("../../../hooks/hooks"),
      useAppSelector: () => jest.fn().mockReturnValue("name"),
    }));

    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <BrowserRouter>
        <StoreProvider>
          <PersonalHomeCard />
        </StoreProvider>
      </BrowserRouter>
    );

    const createPostButton = screen.queryByText("Create Post")

    await userEvent.click(createPostButton)

    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })

});
