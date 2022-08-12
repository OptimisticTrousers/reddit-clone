import { Action, configureStore } from "@reduxjs/toolkit";

export const modalReducer = (state = false, action: Action) => {
  switch (action.type) {
    case "ENABLE_MODAL":
      return true;
    case "DISABLE_MODAL":
      return false;
    default:
      return state;
  }
};

const userAuthReducer = (state = false, action: Action) => {
  switch (action.type) {
    case "LOG_IN":
      return true;
    case "LOG_OUT":
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
