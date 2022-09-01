import {
  fireEvent,
  queryByPlaceholderText,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import ImageSelector from "./ImageSelector";
import React from "react";

describe("ImageSelector", () => {
  test("snapshot", () => {
    const mockProps = {
      selectedFile: "mockFile",
      handleTabChange: jest.fn(),
      setSelectedFile: jest.fn(),
      onSelectImage: jest.fn(),
    };
    const { asFragment } = render(<ImageSelector {...mockProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
  test("back to post button", async () => {
    const mockProps = {
      selectedFile: "mockFile",
      handleTabChange: jest.fn(),
      setSelectedFile: jest.fn(),
      onSelectImage: jest.fn(),
    };

    render(<ImageSelector {...mockProps} />);
    const backToPostButton = screen.queryByTestId("back-to-post-button");

    await userEvent.click(backToPostButton as HTMLButtonElement);

    expect(mockProps.handleTabChange).toHaveBeenCalledTimes(1);
  });
  test("remove button", async () => {
    const mockProps = {
      selectedFile: "mockFile",
      handleTabChange: jest.fn(),
      setSelectedFile: jest.fn(),
      onSelectImage: jest.fn(),
    };

    render(<ImageSelector {...mockProps} />);
    const removeButton = screen.queryByTestId("remove-button");

    await userEvent.click(removeButton as HTMLButtonElement);

    expect(mockProps.setSelectedFile).toHaveBeenCalledTimes(1);
  });

  test("upload file", async () => {
    const mockOnSelectImage = jest.fn();
    const mockInputClick = jest.fn();

    const mockUseRef = jest.fn().mockReturnValue({
      current: {
        click: mockInputClick,
      },
    });
    const mockProps = {
      selectedFile: undefined,
      handleTabChange: jest.fn(),
      setSelectedFile: jest.fn(),
      onSelectImage: mockOnSelectImage,
    };

    jest.mock("react", () => {
      return {
        ...jest.requireActual("react"),
        useRef: mockUseRef,
      };
    });

    render(<ImageSelector {...mockProps} />);
    const fileInput = screen.queryByTestId("file-input");
    const uploadButton = screen.queryByText("Upload")

    const fakeFile = new File(["hello"], "hello.png", { type: "image/png" });

    await userEvent.upload(fileInput as HTMLInputElement, fakeFile);

    await userEvent.click(uploadButton as HTMLButtonElement);

    expect(mockOnSelectImage).toHaveBeenCalledTimes(1);
    expect(mockInputClick).toHaveBeenCalledTimes(1);
  });
});
