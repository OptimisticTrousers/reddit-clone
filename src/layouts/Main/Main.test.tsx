import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Main from "./Main";

describe("Main", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <Main>
        <div>Mock Children</div>
      </Main>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
