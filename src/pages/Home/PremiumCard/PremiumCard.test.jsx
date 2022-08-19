import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import PremiumCard from "./PremiumCard";

describe("PremiumCard", () => {
  test("snapshot", () => {
    const { asFragment } = render(<PremiumCard />);

    expect(asFragment()).toMatchSnapshot();
  });
});
