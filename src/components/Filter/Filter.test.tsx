import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Filter from "./Filter";
import { useReducer } from "react";

describe("Filter", () => {
  test("snapshot", () => {
    const mockProps = {
      filterRising: jest.fn(),
      filterNew: jest.fn(),
      filterTop: jest.fn(),
      addPosts: jest.fn(),
    };
    const { asFragment } = render(<Filter {...mockProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
  test("filter buttons call all functions in props", async () => {
    const mockProps = {
      filterRising: jest.fn(),
      filterNew: jest.fn(),
      filterTop: jest.fn(),
      addPosts: jest.fn(),
    };
    render(<Filter {...mockProps} />);

    const filterRisingButton = screen.queryByRole("button", { name: "Rising" });
    const filterNewButton = screen.queryByRole("button", { name: "New" });
    const filterTopButton = screen.queryByRole("button", { name: "Top" });

    await userEvent.click(filterRisingButton as HTMLButtonElement);
    await userEvent.click(filterNewButton as HTMLButtonElement);
    await userEvent.click(filterTopButton as HTMLButtonElement);

    expect(mockProps.filterTop).toHaveBeenCalledTimes(1);
    expect(mockProps.filterNew).toHaveBeenCalledTimes(1);
    expect(mockProps.filterRising).toHaveBeenCalledTimes(1);
    expect(mockProps.addPosts).toHaveBeenCalledTimes(3);
  });
});
