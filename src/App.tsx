import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./layouts/Navbar/Navbar";
import { useAppSelector } from "./hooks/hooks";
import Modal from "./components/Modal";

const App: React.FC = () => {
  // const isModalActive = useAppSelector((state) => state.modal);
  return (
    <div className="container">
      {/* {isModalActive && <Modal />} */}
      <Navbar />
      <main >
        <Outlet />
      </main>
    </div>
  );
};

export default App;
