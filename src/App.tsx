import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./layouts/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
