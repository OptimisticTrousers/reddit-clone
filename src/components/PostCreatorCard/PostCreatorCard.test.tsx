import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import PostCreatorCard from "./PostCreatorCard";
import { Provider } from "react-redux";
import StoreProvider from "../../redux/provider";
import { BrowserRouter } from "react-router-dom";

describe("PostCreatorCard", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <StoreProvider>
          <PostCreatorCard />
        </StoreProvider>
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  test("user is redirected to create post on input focus", async () => {
    render(
      <BrowserRouter>
        <StoreProvider>
          <PostCreatorCard />
        </StoreProvider>
      </BrowserRouter>
    );
    const mockNavigate = jest.fn();

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    const input = screen.queryByPlaceholderText("Create Post");

    await userEvent.click(input as HTMLInputElement);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
  test("user is directed to profile on profile picture click", async () => {
    render(
      <BrowserRouter>
        <StoreProvider>
          <PostCreatorCard />
        </StoreProvider>
      </BrowserRouter>
    );
    const mockNavigate = jest.fn();

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    const profilePicture = screen.queryByTestId("profile-picture");

    await userEvent.click(profilePicture as HTMLDivElement);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
  test("user is directed to AddPostForm page on image and link click", async () => {


    const mockNavigate = jest.fn();

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom") as any,
      useNavigate: () => mockNavigate,
    }));
    render(
      <BrowserRouter>
        <StoreProvider>
          <PostCreatorCard />
        </StoreProvider>
      </BrowserRouter>
    );
    const gallaryButton = screen.queryByTestId("picture-button");
    const linkButton = screen.queryByTestId("link-button");

    await userEvent.click(gallaryButton as HTMLButtonElement);
    await userEvent.click(linkButton as HTMLButtonElement);

    expect(mockNavigate).toHaveBeenCalledTimes(2);
  });
});
