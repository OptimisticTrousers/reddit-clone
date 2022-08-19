import AuthModal from "./AuthModal";
import {
  getByPlaceholderText,
  queryByPlaceholderText,
  queryByRole,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import StoreProvider from "../../redux/provider";
import * as firebase from "../../firebase";

describe("AuthModal", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <StoreProvider>
        <AuthModal />
      </StoreProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  test("user can correctly enter into the input fields", async () => {
    render(
      <StoreProvider>
        <AuthModal />
      </StoreProvider>
    );

    const user = userEvent.setup();

    const emailInput = screen.queryByPlaceholderText("EMAIL") as HTMLInputElement;
    const userNameInput = screen.queryByPlaceholderText(
      "USERNAME"
    ) as HTMLInputElement;
    const passwordInput = screen.queryByPlaceholderText(
      "PASSWORD"
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.queryByPlaceholderText(
      "CONFIRM PASSWORD"
    ) as HTMLInputElement;

    await user.type(emailInput, "bobjones@gmail.com");
    await user.type(userNameInput, "bobjones123");
    await user.type(passwordInput, "locospollos");
    await user.type(confirmPasswordInput, "locospollos");

    expect(emailInput.textContent).toEqual("bobjones@gmail.com");
    expect(userNameInput.textContent).toEqual("bobjones123");
    expect(passwordInput.textContent).toEqual("locospollos");
    expect(confirmPasswordInput.textContent).toEqual("locospollos");
  });

  test("oauth", async () => {
    render(
      <StoreProvider>
        <AuthModal />
      </StoreProvider>
    );
    const mockSignIn = jest.fn();
    jest.mock("../../firebase", () => ({ signIn: mockSignIn }));

    jest.spyOn(firebase, "signIn");

    const user = userEvent.setup();

    const oAuthButton = screen.queryByRole("button", {
      name: /Continue with Google/i,
    });

    await user.click(oAuthButton!);

    expect(mockSignIn).toBeCalledTimes(1);
  });
  test("email and pasword auth", async () => {
    const user = userEvent.setup();
    const emailInput = screen.queryByPlaceholderText("EMAIL") as HTMLElement;
    const userNameInput = screen.queryByPlaceholderText(
      "USERNAME"
    );
    const passwordInput = screen.queryByPlaceholderText(
      "PASSWORD"
    );
    const confirmPasswordInput = screen.queryByPlaceholderText(
      "CONFIRM PASSWORD"
    );

    await user.type(emailInput, "bobjones@gmail.com");
    await user.type(userNameInput, "bobjones123");
    await user.type(passwordInput, "locospollos");
    await user.type(confirmPasswordInput, "locospollos");
  });
});
