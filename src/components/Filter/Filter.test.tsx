import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Filter from "./Filter";

describe("Filter", () => {

  const mockProps = {
    filterRising: jest.fn(),
    filterNew: jest.fn(),
    filterTop: jest.fn(),
    addPosts: jest.fn(),
  }
  test("snapshot", () => {
    const { asFragment } = render(<Filter {...mockProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
