import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import AddPostForm from "./AddPostForm";

describe("AddPostForm", () => {
  test("snapshot", () => {
    const { asFragment } = render(<AddPostForm />);

    expect(asFragment()).toMatchSnapshot();
  });
});
