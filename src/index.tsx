import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/global.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Subreddit from "./pages/Subreddit/Subreddit";
import CreatePost from "./pages/CreatePost/CreatePost";
import StoreProvider from "./redux/provider";
import SinglePostPage from "./pages/Subreddit/SinglePostPage/SinglePostPage";
import FetchSubredditData from "./pages/Subreddit/FetchSubredditData/FetchSubredditData";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="user" element={<Profile />} />
            <Route index element={<Home />} />
            <Route path="r/">
              <Route path=":subredditName" element={<FetchSubredditData />}>
                <Route index element={<Subreddit />} />
                <Route path="comments/:postId" element={<SinglePostPage />} />
                <Route path="submit" element={<CreatePost />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
