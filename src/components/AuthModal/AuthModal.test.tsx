import AuthModal from "./AuthModal";
import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";

describe("AuthModal", () => {
  test("snapshot", () => {
    const { asFragment } = render(<AuthModal />);

    expect(asFragment()).toMatchSnapshot();
  });
});
