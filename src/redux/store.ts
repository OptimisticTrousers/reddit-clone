import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

// export const authStateObserver = (user) => {

// }

// const modalReducer = (state = false, action: Action) => {
//   switch (action.type) {
//     case "ENABLE_MODAL":
//       return true;
//     case "DISABLE_MODAL":
//       return false;
//     default:
//       return state;
//   }
// };

// const authReducer = (state = false, action: Action) => {
//   switch (action.type) {
//     case "LOG_IN":
//       return true;
//     case "LOG_OUT":
//       return false;
//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
