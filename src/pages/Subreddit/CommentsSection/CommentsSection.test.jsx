import { queryByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import CommentsSection from "./CommentsSection";
import StoreProvider from "../../../redux/provider";
import * as firestore from "firebase/firestore";

describe("CommentsSection", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <StoreProvider>
        <CommentsSection />
      </StoreProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  // test("Test if the submit function is called correctly", async () => {
  //   render(
  //     <StoreProvider>
  //       <CommentsSection />
  //     </StoreProvider>
  //   );
  //   const commentInput = screen.queryByPlaceholderText(
  //     "What are your thoughts?"
  //   );
  //   const submitCommentButton = screen.queryByRole("button", {
  //     name: /Comment/i,
  //   });

  //   const mockCollection = jest.fn();
  //   const mockAddDoc = jest.fn();
  //   const mockDoc = jest.fn();
  //   const mockUpdateDoc = jest.fn();
  //   jest.mock("firebase/firestore", () => ({
  //     ...jest.requireActual("firebase/firestore"),
  //     collection: mockCollection,
  //     addDoc: mockAddDoc,
  //     doc: mockDoc,
  //     updateDoc: mockUpdateDoc,
  //   }));

  //   const mockUseAppSelector = jest.fn().mockReturnValue(true)
  //   jest.mock("../../../hooks/hooks", () => ({
  //     useAppSelector: mockUseAppSelector
  //   }))

  //   const user = userEvent.setup();

  //   await user.type(commentInput, "Here is a new comment");

  //   await user.click(submitCommentButton);

  //   expect(mockCollection).toHaveBeenCalled();
  //   expect(mockAddDoc).toHaveBeenCalled();
  //   expect(mockDoc).toHaveBeenCalled();
  //   expect(mockUpdateDoc).toHaveBeenCalled();
  // });
});
