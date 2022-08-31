import {
  queryByPlaceholderText,
  queryByText,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Modal from "./Modal";

describe("Modal", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <Modal>
        <div>Mock Children</div>
      </Modal>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
