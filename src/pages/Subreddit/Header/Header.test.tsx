import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Header from "./Header";

describe("Header", () => {
  test("snapshot", () => {
    const { asFragment } = render(<Header subredditName="bob jones"/>);

    expect(asFragment()).toMatchSnapshot();
  });
});
