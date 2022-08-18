import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Votes from "./Votes";
import each from "jest-each";

describe("Votes", () => {
  test("snapshot", () => {
    // Arbitrary prop for snapshot testing
    const { asFragment } = render(<Votes voteStatus={5} />);

    expect(asFragment).toMatchSnapshot();
  });
  each([5, 1, 2, 10, 412, 515, 125, 31000]).test(
    "votes rendering correctly based on props",
    (votes) => {
      render(<Votes voteStatus={votes} />);

      expect(screen.getByText(votes)).toBeInTheDocument();
    }
  );
});
