import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Votes from "./Votes";

describe("Votes", () => {
  const mockProps = {
    voteStatus: 5,
    subredditId: "bobjones",
    postId: "bob",
  };
  // test("snapshot", () => {
  //   // Arbitrary prop for snapshot testing
  //   const { asFragment } = render(<Votes {...mockProps} />);

  //   expect(asFragment).toMatchSnapshot();
  // });
  // each([5, 1, 2, 10, 412, 515, 125, 31000]).test(
  //   "votes rendering correctly based on props",
  //   (votes) => {
  //     render(<Votes {...mockProps} />);

  //     expect(screen.getByText(votes)).toBeInTheDocument();
  //   }
  // );
});
