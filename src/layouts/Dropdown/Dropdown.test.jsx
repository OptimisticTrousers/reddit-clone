import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
  test("snapshot", () => {
    const { asFragment } = render(<Dropdown />);

    expect(asFragment()).toMatchSnapshot();
  });
});
