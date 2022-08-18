import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Comment from "./Comment";

describe("Comment", () => {
  const mockProps = {
    comment: {
      content: "this is a mock comment",
    },
  };
  test("snapshot", () => {
    const { asFragment } = render(<Comment {...mockProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
