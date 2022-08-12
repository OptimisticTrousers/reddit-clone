import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const StoreProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
