import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import PersonalHomeCard from "./PersonalHomeCard";

describe("PersonalHomeCard", () => {
  test("snapshot", () => {
    const { asFragment } = render(<PersonalHomeCard />);

    expect(asFragment()).toMatchSnapshot();
  });
});
