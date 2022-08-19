import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import PostAuthor from "./PostAuthor";

describe("PostAuthor", () => {
  test("snapshot", () => {
    const { asFragment } = render(<PostAuthor />);

    expect(asFragment()).toMatchSnapshot();
  });
});
