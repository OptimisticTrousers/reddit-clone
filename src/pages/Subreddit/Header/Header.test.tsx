import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import each from "jest-each";
import Header from "./Header";
import * as firestore from "firebase/firestore";
import StoreProvider from "../../../redux/provider";
import * as firebase from "../../../firebase";

describe("Header", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <StoreProvider>
        <Header subredditName="bob jones" />
      </StoreProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  test("user can join and leave community", () => {
    render(
      <StoreProvider>
        <Header subredditName="bob jones" />
      </StoreProvider>
    );

    jest.mock("../../../firebase", () => ({
      isUserSignedIn: true,
    }));

    const joinCommunityButton = screen.queryByRole("button", { name: "Join" });

    userEvent.click(joinCommunityButton!);

    expect(joinCommunityButton?.textContent).toEqual("Joined");
  });

  test("user can join community", () => {
    render(
      <StoreProvider>
        <Header subredditName="bob jones" />
      </StoreProvider>
    );
    // const mockArrayUnion = jest.fn();
    // const mockUpdateDoc = jest.fn();
    // const mockDoc = jest.fn();
    // const mockGetUserId = jest.fn();

    // jest.mock("firebase/firestore", () => ({
    //   arrayUnion: mockArrayUnion,
    //   doc: mockDoc,
    //   updateDoc: mockUpdateDoc,
    //   getUserId: mockGetUserId,
    // }));

    const mockIsUserSignedIn = jest.fn(() => true);
    // jest.mock("../../../firebase", () => ({
    //   ...jest.requireActual("../../../firebase"),
    //   isUserSignedIn: true,
    // }));

    const spy = jest.spyOn(firebase, "isUserSignedIn");
    const joinCommunityButton = screen.queryByRole("button", { name: "Join" });

    userEvent.click(joinCommunityButton!);

    // expect(spy).toHaveBeenCalled();

    // expect(mockArrayUnion).toBeCalled();
    // expect(mockUpdateDoc).toBeCalled();
    // expect(mockDoc).toBeCalled();
    // expect(mockGetUserId).toBeCalled();
  });
});
