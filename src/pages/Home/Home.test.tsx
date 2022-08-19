import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Home from "./Home";

describe("Home", () => {
  test("snapshot", () => {
    const { asFragment } = render(<Home />);

    expect(asFragment()).toMatchSnapshot();
  });
});
