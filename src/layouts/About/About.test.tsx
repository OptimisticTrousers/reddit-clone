import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import About from "./About";

describe("About", () => {
  test("snapshot", () => {
    const { asFragment } = render(<About />);

    expect(asFragment()).toMatchSnapshot();
  });
});
