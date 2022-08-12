import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/global.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Subreddit from "./pages/Subreddit";
import CreatePost from "./pages/Subreddit/CreatePost/CreatePost";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import StoreProvider from "./redux/provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreProvider>
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="r/" element={<Subreddit />} />
            <Route path="submit" element={<CreatePost />} />
          </Route>
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </StoreProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
