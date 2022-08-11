import { Action, AnyAction, configureStore } from "@reduxjs/toolkit";
import { Reducer } from "react";

type State = boolean | undefined;

export const modalReducer = (state: State, action: Action) => {
  switch (action.type) {
    case false:
      return true;
    case true:
      return false;
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;