import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import TopCommunitiesCard from "./TopCommunitiesCard";

describe("TopCommunitiesCard", () => {
  test("snapshot", () => {
    const { asFragment } = render(<TopCommunitiesCard />);

    expect(asFragment()).toMatchSnapshot();
  });
});
