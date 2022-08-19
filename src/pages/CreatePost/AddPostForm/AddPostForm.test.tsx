import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import AddPostForm from "./AddPostForm";
import StoreProvider from "../../../redux/provider";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { MemoryRouter, useNavigate } from "react-router-dom";

describe("AddPostForm", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AddPostForm />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  // test("post is created", async () => {
  //   render(
  //     <MemoryRouter>
  //       <StoreProvider>
  //         <AddPostForm />
  //       </StoreProvider>
  //     </MemoryRouter>
  //   );

  //   const titleInput = screen.queryByPlaceholderText("Title");
  //   const descriptionInput = screen.queryByPlaceholderText("Editor");
  //   const submitButton = screen.queryByRole("button", { name: /Post/i });

  //   const mockCollection = jest.fn();
  //   const mockAddDoc = jest.fn().mockReturnValue(new Promise((res) => res(1)));
  //   const mockUseNavigate = jest.fn();
  //   jest.mock("firebase/firestore", () => ({
  //     collection: mockCollection,
  //     addDoc: mockAddDoc,
  //   }));

  //   jest.mock("react-router-dom", () => ({
  //     useNavigate: mockUseNavigate,
  //   }));

  //   jest.mock("nanoid", () => ({
  //     nanoid: jest.fn(),
  //   }));

  //   const user = userEvent.setup();

  //   await user.type(titleInput!, "Bob Jones");

  //   await user.type(descriptionInput!, "Here is a description");

  //   await user.click(submitButton!);

  //   expect(mockCollection).toHaveBeenCalledTimes(1);
  //   expect(mockAddDoc).toHaveBeenCalledTimes(1);
  //   expect(mockUseNavigate).toHaveBeenCalledTimes(1);
  // });
});
