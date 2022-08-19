import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Filter from "./Filter";

describe("Filter", () => {
  test("snapshot", () => {
    const { asFragment } = render(<Filter />);

    expect(asFragment()).toMatchSnapshot();
  });
});
