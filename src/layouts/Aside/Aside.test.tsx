import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Aside from "./Aside";

describe("Aside", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <Aside>
        <div>Mock Children</div>
      </Aside>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
