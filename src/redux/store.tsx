import { Action, configureStore } from "@reduxjs/toolkit";

type State = boolean | undefined;

export const modalReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ENABLE_MODAL":
      return true;
    case "DISABLE_MODAL":
      return false;
    default:
      return state;
  }
};

export const modalSlice = ({
  name: 'modal',
  initialState: {
    value: false
  },
  reducers: {
    
  }
})

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
