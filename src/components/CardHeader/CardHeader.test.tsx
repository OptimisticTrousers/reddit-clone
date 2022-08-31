import {
  queryByPlaceholderText,
  queryByTestId,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import CardHeader from "./CardHeader";

describe("CardHeader", () => {
  test("snapshot", () => {
    const { asFragment } = render(<CardHeader />);

    expect(asFragment()).toMatchSnapshot();
  });
});
