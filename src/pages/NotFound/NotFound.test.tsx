import {
  queryByPlaceholderText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import NotFound from "./NotFound";
import { BrowserRouter } from "react-router-dom";

describe("NotFound", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("user is navigated after a certain time", async () => {

    const mockNavigate = jest.fn()
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate
    }))

    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
